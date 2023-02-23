import jwt from 'jsonwebtoken'
import AuthModel from '../Model/AuthModel.js';

const getToken = (id, role = 'user') => {
    const secret = process.env.TOKEN_SECRET;

    const user = {
        id,
        role
    }
    const token = jwt.sign(user, secret, { expiresIn: Number.parseInt(process.env.TOKEN_LIFE) });
    const refreshToken = jwt.sign(user, secret, { expiresIn: Number.parseInt(process.env.TOKEN_REFRESH_LIFE) })
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    return response
}

const validateToken = (req, res, next) => {
    const secret = process.env.TOKEN_SECRET;
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    token = token.replace('Bearer', '').replace('bearer', '').replace(' ', '');
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}

const login = async (req, res) => {
    const user = await AuthModel.login(req.body);
    const token = getToken(user._id, 'user');
    res.send({ user, token });
}

export default {
    getToken,
    validateToken,
    login
}

