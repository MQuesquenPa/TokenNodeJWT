import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenUtils';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ status: res.statusCode, message: 'Acceso denegado' });

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (error:any) {
        res.status(403).json({status: res.statusCode, message: 'Token inválido', detail: error.ToString() });
    }
};
