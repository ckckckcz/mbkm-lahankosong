import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getOperations = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('operations')
            .select(`
        *,
        groups (name),
        shifts (name),
        production_lines (name)
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createOperation = async (req: Request, res: Response) => {
    try {
        const {
            date,
            group_id,
            shift_id,
            production_line_id,
            temperature,
            weight,
            quality,
            input_method
        } = req.body;

        // Basic Validation
        if (!date || !group_id || !shift_id || !production_line_id || temperature === undefined || weight === undefined) {
            return res.status(400).json({ error: "Please provide all required fields: date, group_id, shift_id, production_line_id, temperature, weight" });
        }

        const { data, error } = await supabase
            .from('operations')
            .insert([{
                date,
                group_id,
                shift_id,
                production_line_id,
                temperature,
                weight,
                quality,
                input_method
            }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOperation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            date,
            group_id,
            shift_id,
            production_line_id,
            temperature,
            weight,
            quality,
            input_method
        } = req.body;

        const { data, error } = await supabase
            .from('operations')
            .update({
                date,
                group_id,
                shift_id,
                production_line_id,
                temperature,
                weight,
                quality,
                input_method
            })
            .eq('id', id)
            .select();

        if (error) throw error;

        res.status(200).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOperation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('operations')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(200).json({ message: 'Operation deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
