import mongoose from "mongoose";



const connectDB = async () => {
    try {
        const conn =await mongoose.connect('mongodb+srv://Pankaj2608:Pankajjaat2608@pankaj.f0v1p.mongodb.net/');
        console.log(`MongoDB Connected: mongodb+srv://Pankaj2608:Pankajjaat2608@pankaj.f0v1p.mongodb.net/}`);
        return conn;
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;
