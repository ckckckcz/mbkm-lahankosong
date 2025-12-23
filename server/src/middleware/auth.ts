import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Request, Response, NextFunction } from "express";

const {
    SUPABASE_JWKS_URL,
    SUPABASE_JWT_ISSUER
} = process.env;

if (!SUPABASE_JWKS_URL || !SUPABASE_JWT_ISSUER) {
    throw new Error("Missing Supabase auth env variables");
}

const client = jwksClient({
    jwksUri: SUPABASE_JWKS_URL
});

function getKey(header: any, callback: any) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key?.getPublicKey();
        callback(err, signingKey);
    });
}

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        getKey,
        {
            algorithms: ["RS256"],
            issuer: SUPABASE_JWT_ISSUER
        },
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }

            (req as any).user = decoded;
            next();
        }
    );
}
