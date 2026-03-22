import jwt from "jsonwebtoken";

type JwtUser = {
  userId: string;
  email: string;
};
//we can use jwtUser or any anything we like but for safety we need to use jwt user

export const getUserFromToken = (req: Request): any | null => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as any;   

    return decoded;
  } catch {
    return null;
  }
};