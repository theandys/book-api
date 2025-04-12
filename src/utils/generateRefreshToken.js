import jwt from 'jsonwebtoken';

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d',
    });
};

export default generateRefreshToken;