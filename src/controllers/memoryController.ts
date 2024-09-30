import { Request, Response } from "express";

import { prisma } from "../services/prisma";

interface AuthRequest extends Request {
  user?: { uid: string };
}

export const createMemory = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;
  const { description, imageUrl } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const memory = await prisma.memory.create({
      data: {
        description,
        imageUrl,
        userId,
      },
    });

    return res.status(200).json({ message: "Memória adicionada.", memory });
  } catch (error) {
    console.log("Erro ao adicionar memória: ", error);
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
};

export const getMemoriesByUserId = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const memories = await prisma.memory.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({ message: "memórias", memories, userId });
  } catch (error) {
    console.error("Erro ao buscar memórias:", error);

    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getMemoriesByUserOrCoupleId = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user?.uid;
  const coupleId = req.query.coupleId as string;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const memories = await prisma.memory.findMany({
      where: {
        OR: [{ userId: userId }, { userId: coupleId }],
      },
    });

    res.json(memories);
  } catch (error) {
    console.error("Erro ao buscar memórias:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteMemory = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;
  const memoryId = req.params["id"];

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const memory = await prisma.memory.delete({
      where: {
        id: memoryId,
        userId: userId,
      },
    });

    return res.status(200).json({ message: "Memória apagada.", memory });
  } catch (error) {
    console.log("Erro ao apagar memória.", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
