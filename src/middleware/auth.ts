import { Request, Response, NextFunction } from "express";

import admin from "../firebase";

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido ou inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Falha na autenticação do token", error });
  }
};
