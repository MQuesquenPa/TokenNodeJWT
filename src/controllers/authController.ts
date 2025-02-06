import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db';
import { generateToken } from '../utils/tokenUtils';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
        const users = rows as any[];

        if (users.length === 0) {
            res.status(401).json({status: res.status, message: 'Credenciales inválidas' });
            return;
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({status: res.statusCode, message: 'Credenciales inválidas' });
            return;
        }

        const token = generateToken(user.email, user.role || 'user');

        await pool.execute('UPDATE user SET last_login = NOW() WHERE email = ?', [email]);
        res.json({ token });

    } catch (error:any) {
        res.status(500).json({ status: res.status, message: 'Error interno del servidor', detail: error.toString() });
    }
};
