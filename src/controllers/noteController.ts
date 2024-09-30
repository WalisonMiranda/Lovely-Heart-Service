import { Request, response, Response } from "express";

import { prisma } from "../services/prisma";

interface AuthRequest extends Request {
  user?: { uid: string };
}

export const createNote = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;
  const { description } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const note = await prisma.note.create({
      data: {
        description,
        userId,
      },
    });
    return res.status(200).json({ message: "Nota adicionada." });
  } catch (error) {
    console.log("Erro ao adicionar nota: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getNotesByUserId = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({ notes });
  } catch (error) {
    console.log("Erro ao buscar notas.", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.uid;
  const { noteId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const note = await prisma.note.delete({
      where: {
        id: noteId,
        userId,
      },
    });

    return res.status(200).json({ message: "Nota apagada." });
  } catch (error) {
    console.log("Erro ao apagar nota.", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
