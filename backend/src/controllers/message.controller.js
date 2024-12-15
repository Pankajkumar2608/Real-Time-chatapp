
import User from '../models/user.model.js';
import Message from '../models/message.model';
export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUser  = await User.find({_id: {$ne: loggedUserId}}).select('name profilePic _id --password');
        res.status(200).json(filteredUser);
    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
    }
}
export const getMessages = async(req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myUserId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId: myUserId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myUserId},
            ]
        })
        res.status(200).json(messages);


    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
    }
}
export const sendMessage = async(req, res) => {
    try {
        const {id: receiverUserId} = req.params;
        const myUserId = req.user._id;
        const {text, Image} = req.body;
        let imageUrl;
        if(Image){
            const image = await cloudinary.uploader.upload(Image);
            imageUrl = image.secure_url;
        }
        const newMessage = await Message.create({
            senderId: myUserId,
            receiverId: receiverUserId,
            text,
            Image: imageUrl
        })
       
        await newMessage.save();
        
        //realtime functionailty

        res.status(200).json(newMessage); 

        
    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
    }
}