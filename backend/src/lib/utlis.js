import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const JWT_SECRET = 'myseractkey';
    const token = jwt.sign( {userId}, JWT_SECRET, {
        expiresIn: "7d",

    })
    res.cookie('token', token, {
        httpOnly: true,//prevent client side js from accessing the cookie & prevent xss
        secure: false, // in production is true
        sameSite: "strict",//prevent csrf attack
        maxAge: 7 * 24 * 60 * 60 * 1000 //ms
    })
    return token;
}
