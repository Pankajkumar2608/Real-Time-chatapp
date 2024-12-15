import User from '../models/user.model.js';
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({message: "Unauthorized"});
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId).select("-password");
        if (!user){
            return res.status(401).json({message: "Unauthorized"});
        }
        req.user = user;
        next();
    } catch (error) {
        
    }
}
export default isAuthenticated;