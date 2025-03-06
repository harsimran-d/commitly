import express from "express";
import {
  completeCommitment,
  createCommitment,
  deleteCommitment,
  getCommitmentById,
  getCommitments,
  updateCommitment,
} from "../controllers/commitment.controller.ts";

const router = express.Router();
router.get("/", getCommitments);
router.get("/:id", getCommitmentById);
router.post("/", createCommitment);
router.patch("/:id", updateCommitment);
router.patch("/:id/complete", completeCommitment);
router.delete("/:id", deleteCommitment);

export default router;
