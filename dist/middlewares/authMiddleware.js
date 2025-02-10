"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const tokenUtils_1 = require("../utils/tokenUtils");
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Acceso denegado' });
    try {
        const decoded = (0, tokenUtils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
};
exports.authenticateToken = authenticateToken;
