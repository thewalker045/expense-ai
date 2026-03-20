import { connectDB } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { generateOTP } from "@/lib/otp";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export async function POST(req: Request) {
  await connectDB()

  const { email, password } = await req.json()

  const user = await User.findOne({ email })

  if (!user) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    )
  }

  if (!user.isVerified) {
    return Response.json(
      { success: false, message: "Please verify your account" },
      { status: 401 }
    )
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return Response.json(
      { success: false, message: "Wrong password" },
      { status: 400 }
    )
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  )

  return Response.json({ token })
}