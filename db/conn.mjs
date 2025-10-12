import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectionStr = process.env.mongoURI || "";
async function connectDB(){
    try{
        await mongoose.connect(connectionStr);
        console.log(`MongoDB connected...`);
    
     }catch(err){
        console.err(`Error -${err.message}`);
        process.exit(1);
     }
}
export default connectDB;