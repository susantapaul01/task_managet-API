import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";
import jwt from 'jsonwebtoken';

export const TokenEncode = (email, user_id) => {
    let KEY = JWT_KEY;
    let EXPIRE_TIME = {expiresIn: JWT_EXPIRE_TIME };
    let PAYLOAD = { email: email, user_id: user_id};
    let token = jwt.sign(PAYLOAD, KEY, EXPIRE_TIME);
    return token;
}

export const TokenDecode = (token) => {
    try {
        return jwt.verify(token, JWT_KEY);
    }
    catch(e) {
        return null;
    }
}