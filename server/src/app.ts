import express, { Application } from "express";
import cors from "cors";
import { supabase } from "./config/supabase";
import groupsRoutes from "./routes/groupsRoutes";
import shiftsRoutes from "./routes/shiftsRoutes";
import productionLinesRoutes from "./routes/productionLinesRoutes";
import operationsRoutes from "./routes/operationsRoutes";
import authRoutes from "./routes/authRoutes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const { error } = await supabase.from('groups').select('count', { count: 'exact', head: true });
        if (error) {
            console.error("Supabase connection error:", error);
            res.status(500).json({
                message: "API berjalan tapi GAGAL connect ke Supabase",
                error: error.message
            });
        } else {
            res.json({ message: "API berjalan dan BERHASIL connect ke Supabase!" });
        }
    } catch (err: any) {
        res.status(500).json({
            message: "API error",
            error: err.message
        });
    }
});

app.use("/api/groups", groupsRoutes);
app.use("/api/shifts", shiftsRoutes);
app.use("/api/production-lines", productionLinesRoutes);
app.use("/api/operations", operationsRoutes);
app.use("/api/auth", authRoutes);

export default app;
