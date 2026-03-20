import nodemailer from "nodemailer"

export const sendMail = async (email: string, otp: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    to: email,
    subject: "your OTP code",
    text: `your OTP is ${otp}` 
  })
}