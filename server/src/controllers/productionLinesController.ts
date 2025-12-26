import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getProductionLines = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('production_lines')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createProductionLine = async (req: Request, res: Response) => {
    try {
        const { name, status } = req.body;
        if (!name || !status) return res.status(400).json({ error: "Name and status are required" });

        const { data, error } = await supabase
            .from('production_lines')
            .insert([{ name, status }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProductionLine = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const { data, error } = await supabase
            .from('production_lines')
            .update({ name, status })
            .eq('id', id)
            .select();

        if (error) throw error;

        res.status(200).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductionLine = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('production_lines')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(200).json({ message: 'Production Line deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
