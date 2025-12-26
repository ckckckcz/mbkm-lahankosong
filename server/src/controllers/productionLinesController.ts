import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { ProductionLine } from '../types';

export class ProductionLinesController {
    static async getProductionLines(req: Request, res: Response) {
        try {
            const { data, error } = await supabase
                .from('production_lines')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            res.status(200).json(data as ProductionLine[]);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }

    static async createProductionLine(req: Request, res: Response) {
        try {
            const { name, status } = req.body;
            if (!name || !status) return res.status(400).json({ error: "Name and status are required" });

            const { data, error } = await supabase
                .from('production_lines')
                .insert([{ name, status }])
                .select();

            if (error) throw error;

            res.status(201).json(data[0] as ProductionLine);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }

    static async updateProductionLine(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, status } = req.body;
            const { data, error } = await supabase
                .from('production_lines')
                .update({ name, status })
                .eq('id', id)
                .select();

            if (error) throw error;

            res.status(200).json(data[0] as ProductionLine);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }

    static async deleteProductionLine(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { error } = await supabase
                .from('production_lines')
                .delete()
                .eq('id', id);

            if (error) throw error;

            res.status(200).json({ message: 'Production Line deleted successfully' });
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }
}
