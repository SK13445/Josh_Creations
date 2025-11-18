import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./src/lib/db.js";
import inquiriesRouter from "./src/routes/inquiry.js";
import projectsRouter from "./src/routes/projects.js";
import authRouter from "./src/routes/auth.js";

const app = express();

// ---- CONFIG ----
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://josh-creations.vercel.app", // Production frontend
];

// ---- CORS FIX (IMPORTANT) ----
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow tools / mobile apps / curl (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Preflight support
app.options("*", cors());

// ---- MIDDLEWARE ----
app.use(express.json());
app.use(morgan("dev"));

// ---- HEALTH CHECK ----
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "josh-creations-api" });
});

// ---- CONTACT ROUTE ----
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

// ---- API ROUTES ----
app.use("/api/auth", authRouter);
app.use("/api/inquiry", inquiriesRouter);
app.use("/api/projects", projectsRouter);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ---- START SERVER ----
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
