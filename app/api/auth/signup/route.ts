import { userSchema } from "@/app/schemas/userSchema"
import { connectDB } from "@/lib/db"
import { sendMail } from "@/lib/mailer"
import { generateOTP } from "@/lib/otp"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  await connectDB()

  const body = await req.json()

  const res = userSchema.safeParse(body)

  if (!res.success) {
    return Response.json(
      { success: false, errors: res.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { email, password } = res.data

  const existing = await User.findOne({ email })

  if (existing && existing.isVerified) {
    return Response.json(
      { success: false, message: "User already exists" },
      { status: 400 }
    )
  }

  const otp = generateOTP()
  console.log(otp);
  

  let hashedPassword = existing?.password

  if (!existing) {
    hashedPassword = await bcrypt.hash(password, 10)
  }

  await User.findOneAndUpdate(
    { email },
    {
      email,
      password: hashedPassword,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      isVerified: false,
    },
    { upsert: true, new: true }
  )

  await sendMail(email, otp)

  return Response.json({
    success: true,
    message: "OTP sent for signup",
  })
}