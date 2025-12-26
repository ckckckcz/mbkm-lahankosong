import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getShifts = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('shifts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createShift = async (req: Request, res: Response) => {
    try {
        const { name, start_time, end_time, status } = req.body;
        if (!name || !start_time || !end_time || !status) return res.status(400).json({ error: "Name, start_time, end_time, and status are required" });

        const { data, error } = await supabase
            .from('shifts')
            .insert([{ name, start_time, end_time, status }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateShift = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, start_time, end_time, status } = req.body;
        const { data, error } = await supabase
            .from('shifts')
            .update({ name, start_time, end_time, status })
            .eq('id', id)
            .select();

        if (error) throw error;

        res.status(200).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteShift = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('shifts')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(200).json({ message: 'Shift deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
