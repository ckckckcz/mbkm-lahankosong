import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { Operation } from '../types';

export class OperationsController {
    static async getOperations(req: Request, res: Response) {
        try {
            const { data, error } = await supabase
                .from('operations')
                .select(`
            *,
            groups (name),
            shifts (name),
            production_lines (name)
          `)
                .order('created_at', { ascending: false })
                .limit(500);

            if (error) throw error;

            res.status(200).json(data as Operation[]);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }

    static async createOperation(req: Request, res: Response) {
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

            if (!date || !group_id || !shift_id || !production_line_id || temperature === undefined || weight === undefined) {
                const missing = [];
                if (!date) missing.push('date');
                if (!group_id) missing.push('group_id');
                if (!shift_id) missing.push('shift_id');
                if (!production_line_id) missing.push('production_line_id');
                if (temperature === undefined) missing.push('temperature');
                if (weight === undefined) missing.push('weight');
                return res.status(400).json({ error: `Please provide all required fields: ${missing.join(', ')}` });
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

            res.status(201).json(data[0] as Operation);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }

    static async updateOperation(req: Request, res: Response) {
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

            res.status(200).json(data[0] as Operation);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }

    static async deleteOperation(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { error } = await supabase
                .from('operations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            res.status(200).json({ message: 'Operation deleted successfully' });
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        }
    }
}
