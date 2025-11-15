import express from "express";
import Project from "../models/Project.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ projects });
});

// CREATE project (with thumbnail)
router.post("/", verifyToken, upload.single("thumb"), async (req, res) => {
  try {
    const { title, description, url, tags } = req.body;

    const project = await Project.create({
      title,
      description,
      url,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      thumb: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("❌ Project creation error:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// DELETE project
router.delete("/:id", verifyToken, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
