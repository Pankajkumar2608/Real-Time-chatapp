import { generateToken } from '../lib/utlis.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloundnary.js';


export const signup = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password) return res.status(400).send('All fields are required');
        const user = await User.findOne( { email });
        if (user) return res.status(400).send('User already Exist');
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser  = new User ({ name, email, password:hashPassword });
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        }else{
            res.status(400).send('something went wrong! Please try again');

        }


    } catch (error) {
        console.log(error);
        res.send(error);
        
    }
    
}

export const login = async(req, res) => {   
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).send('All fields are required');
        const user = await User.findOne( { email });
        if (!user) return res.status(400).send('User does not exist');
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).send('Invalid credentials');
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic
        })
        
    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
        
    } 

           
}        

export const logout = (req, res) => {   
    try {
        res.cookie('token', null, {
            maxAge: 0
        }) 
        res.status(200).json({message: 'Logout Successfully'})
    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
    }   
}
export const profileUpdate = async(req, res) => {
    try {
        const { profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic) return res.status(400).send('All fields are required');
        const updatedPic = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: updatedPic.secure_url}, {new: true});
        res.status(200).json(updatedUser,{message: 'Profile Updated Successfully'});
        
    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
    }
}

export const checkAuth = async(req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
    }
}
