import app from "./src/app.js"
import dotenv from "dotenv"
dotenv.config()
import CONNECT_DB from "./src/config/db.js"

const STARTSERVER = async()=>{
    try{
        await CONNECT_DB()
        app.listen(process.env.PORT||8000,()=>{
            console.log("Serving is running on PORT: ",process.env.PORT||8000)
})
    }
    catch(err){
        console.log("Server Failed to Start ❌")
    }
}
STARTSERVER()

