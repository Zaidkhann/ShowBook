import mongoose, { mongo } from  "mongoose";

const CONNECT_DB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected Successfully");
    }
    catch(err){
        console.log("Error Failed to connect Database ❌", err)
        process.exit(1)
    }
}

export default CONNECT_DB