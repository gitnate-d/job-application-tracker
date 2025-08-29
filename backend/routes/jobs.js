import express from "express";
import Job from "../models/Job.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Get all jobs for user
router.get("/", authenticate, async (req, res) => {
  const jobs = await Job.find({ user: req.user.id });
  res.json(jobs);
});

// Create job
router.post("/", authenticate, async (req, res) => {
  const job = await Job.create({ ...req.body, user: req.user.id });
  res.json(job);
});

// Update job
router.patch("/:id", authenticate, async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
});

// Delete job
router.delete("/:id", authenticate, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

export default router;
