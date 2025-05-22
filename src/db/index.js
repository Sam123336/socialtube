import mongoose from "mongoose";
const connectDB = async ()=>{
    try{
       const connectionObject = await  mongoose.connect(`${process.env.MONGO_URI}`)
       console.log(`MongoDB connected: ${connectionObject}`);
    }
    catch(err){
        console.log(err);
        throw err;
    }
    
}
export default connectDB;