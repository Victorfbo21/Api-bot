import jwt from 'jsonwebtoken'
const secret = process.env.TOKEN_SECRET;

const getToken = (id, role) => {
    const user = {
        id,
        role: 'user'
    }
    const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: Number.parser(process.env.TOKEN_LIFE) });
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: process.env.TOKEN_REFRESH_LIFE })
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    return response
}

const validateToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
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

export default {
    getToken,
    validateToken
}

