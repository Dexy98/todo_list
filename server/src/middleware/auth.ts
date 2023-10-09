import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      user: string;
    };
    req.body.userId = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
