import mongoose from "mongoose";
import "dotenv/config";

export const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected in the host:"+connection.connection.host);
    } catch (error) {
        console.log(error.message);

    }
}