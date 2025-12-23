declare namespace NodeJS {
    interface ProcessEnv {
        SUPABASE_URL: string;
        SUPABASE_JWKS_URL: string;
        SUPABASE_JWT_ISSUER: string;
        PORT: number;
    }
}
