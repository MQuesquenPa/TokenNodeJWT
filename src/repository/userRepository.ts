import { pool } from '../config/db';
import { RowDataPacket } from 'mysql2';

export const verifyLogin = async (email:String) => {
    const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
    return rows
}

export const getAllUsers = async () => {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT EMAIL, ROLE, STATUS FROM user');
    return rows;
};

export const updateLastLogin = async (email:String) => {
    const [rows] = await pool.execute('UPDATE user SET last_login = NOW() WHERE email = ?', [email]);
    return rows;
};


