import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export class GroupsController {
    static async getGroups(req: Request, res: Response) {
        try {
            const { data, error } = await supabase
                .from('groups')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createGroup(req: Request, res: Response) {
        try {
            const { name, status } = req.body;
            if (!name || !status) return res.status(400).json({ error: "Name and status are required" });

            const { data, error } = await supabase
                .from('groups')
                .insert([{ name, status }])
                .select();

            if (error) throw error;

            res.status(201).json(data[0]);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateGroup(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, status } = req.body;
            const { data, error } = await supabase
                .from('groups')
                .update({ name, status })
                .eq('id', id)
                .select();

            if (error) throw error;

            res.status(200).json(data[0]);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteGroup(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { error } = await supabase
                .from('groups')
                .delete()
                .eq('id', id);

            if (error) throw error;

            res.status(200).json({ message: 'Group deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
