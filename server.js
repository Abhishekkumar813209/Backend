import app from "./app.js"
import {connectDB} from "./config/database.js"
import net from "net"
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron"
import {Stats} from "./models/stats.js"

//database Connection 
connectDB()

const socket = new net.Socket();

socket.setTimeout(30000);

socket.on('timeout',()=>{
    console.log('Socket connection timed out')
    socket.destroy();
})

socket.connect(4000,'localhost',()=>{
    console.log('Socket Connected')
})

cloudinary.v2.config({

    cloud_name: 'dkya9km8h', 
    api_key: '817693881242651', 
    api_secret: 'CQvBsRrw-QjG21tn-qUZM5n9uN8',
    secure: true 
})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})

nodeCron.schedule("0 0 0 1 * *",async()=>{
    try{
        await Stats.create({});
    } catch(error){
        console.log(error);
    }
})


app.listen(process.env.PORT,()=>{
    console.log(`server is started at port ${process.env.PORt}`)
})