import { z } from "zod"

export const userSchema=z.object({
    email:z.string().min(2,"Name must be atleast 2 characters"),
    password:z.string().min(8, "Password must be at least 8 characters")
})

export type UserType = z.infer<typeof userSchema>;