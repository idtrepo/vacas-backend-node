import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../../config/settings.js';


export const generarToken = ({ data, expiresIn }) => {
    return jwt.sign(data, TOKEN_SECRET_KEY, { expiresIn });
}

export const evaluarToken = ({ token }) => {
    try {
        return jwt.verify(token, TOKEN_SECRET_KEY);
    } catch (err) {
        return false;
    }
}