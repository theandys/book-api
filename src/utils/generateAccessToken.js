import jwt from 'jsonwebtoken';

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m',
    });
};

export default generateAccessToken;