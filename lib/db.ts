import mongoose from "mongoose"
import dns from "dns"

dns.setServers(["1.1.1.1","8.8.8.8"])

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing ")
    }

    await mongoose.connect(process.env.MONGO_URI,{
      family:4
    })

    console.log("MongoDB Connected ")
  } catch (error) {
    console.error("DB connection error ", error)
    throw error
  }
}