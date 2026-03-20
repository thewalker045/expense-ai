import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { MessageChannel } from "worker_threads";


export async function POST(req:Request){
    await connectDB()
    const {email,otp}=await req.json()
    console.log(otp);
    

    const user=await User.findOne({email})

    if(!user || user.otp!=otp || user.otpExpiry!<new Date()){
        return Response.json({
            success:false,
            message:"invalid Otp"
        },{status:400})
    }

    user.isVerified=true
    await user.save()

    return Response.json({
        success:true,
        message:"signup successfull"
    })
}