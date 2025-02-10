"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenUtils_1 = require("../utils/tokenUtils");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const [rows] = yield db_1.default.execute('SELECT * FROM user WHERE email = ?', [email]);
        const users = rows;
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const user = users[0];
        // Verificar contraseña
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        // Generar token
        const token = (0, tokenUtils_1.generateToken)(user.email, user.role || 'user');
        // Actualizar `last_login`
        yield db_1.default.execute('UPDATE user SET last_login = NOW() WHERE email = ?', [email]);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.login = login;
