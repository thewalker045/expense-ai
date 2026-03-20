import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  email: string
  otp?: string
  otpExpiry?: Date
  isVerified: boolean
  createdAt: Date
  password: string
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: String,
    otpExpiry: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User