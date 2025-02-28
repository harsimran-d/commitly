import { z } from "zod";
import { prisma } from "main-db";

const commitmentSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  startDate: z.string(),
  frequency: z.number().positive(),
  periodDuration: z.number().positive(),
  reminderFrequency: z.number().positive(),
});

import { Request, Response } from "express";

const getCommitments = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const commitments = await prisma.commitment.findMany({
      where: {
        userId,
      },
    });
    res.json(commitments);
  } catch (error) {
    console.error("Error getting commitments:", error);
    res.status(500).json({
      message: "Error getting commitments",
    });
  }
};

const getCommitmentById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const commitmentId = req.params.id;
    const commitment = await prisma.commitment.findFirst({
      where: {
        id: commitmentId,
        userId,
      },
    });
    if (!commitment) {
      res.status(404).json({
        message: "Commitment not found",
      });
      return;
    }
    res.json(commitment);
  } catch (error) {
    console.error("Error getting commitment by id:", error);
    res.status(500).json({
      message: "Error getting commitment",
    });
  }
};

const createCommitment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const data = commitmentSchema.parse(req.body);
    const commitment = await prisma.commitment.create({
      data: {
        ...data,
        userId,
      },
    });
    res.json(commitment);
  } catch (error) {
    console.error("Error creating commitment:", error);
    res.status(500).json({
      message: "Error creating commitment",
    });
  }
};

const updateCommitment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const commitmentId = req.params.id;
    const data = commitmentSchema.parse(req.body);
    const commitment = await prisma.commitment.update({
      where: {
        id: commitmentId,
        userId,
      },
      data,
    });
    res.json(commitment);
  } catch (error) {
    console.error("Error updating commitment:", error);
    res.status(500).json({
      message: "Error updating commitment",
    });
  }
};

const completeCommitment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const commitmentId = req.params.id;
    const commitment = await prisma.commitment.update({
      where: {
        id: commitmentId,
        userId,
      },
      data: {
        isActive: false,
      },
    });
    res.json(commitment);
  } catch (error) {
    console.error("Error completing commitment:", error);
    res.status(500).json({
      message: "Error completing commitment",
    });
  }
};

const deleteCommitment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const commitmentId = req.params.id;
    await prisma.commitment.delete({
      where: {
        id: commitmentId,
        userId,
      },
    });
    res.json({
      message: "Commitment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting commitment:", error);
    res.status(500).json({
      message: "Error deleting commitment",
    });
  }
};
export {
  getCommitments,
  getCommitmentById,
  createCommitment,
  updateCommitment,
  completeCommitment,
  deleteCommitment,
};
