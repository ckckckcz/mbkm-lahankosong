import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !users) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (users.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: users.id, email: users.email, role: users.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: users.id,
                email: users.email,
                name: users.name,
                role: users.role
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        const { data, error } = await supabase
            .from('users')
            .insert([{ email, password, name, role: 'user' }])
            .select();

        if (error) throw error;

        res.status(201).json({ message: 'User registered successfully', user: data[0] });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
