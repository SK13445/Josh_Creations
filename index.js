import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./src/lib/db.js";
import inquiriesRouter from "./src/routes/inquiry.js";
import projectsRouter from "./src/routes/projects.js";
import authRouter from "./src/routes/auth.js";

const app = express();

// Config
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Health
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "josh-creations-api" });
});

// Contact mail form route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await sendContactEmail(name, email, subject, message);
    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/inquiry", inquiriesRouter);
app.use("/api/projects", projectsRouter);
app.use("/uploads", express.static("uploads"));

// Start
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
