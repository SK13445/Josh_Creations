import { Router } from "express";
import { Inquiry } from "../models/Inquiry.js";
import sendContactEmail from "../lib/mailer.js";

const router = Router();

/**
 * Handle inquiry form submission
 * Fields:
 * - name
 * - email
 * - service (dropdown)
 * - message
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, service, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !service) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save inquiry to database
    const inquiry = await Inquiry.create({
      name,
      email,
      service,
      message,
    });

    // Send emails (admin + auto reply)
    sendContactEmail(name, email, service, message).catch((err) => {
      console.error("❌ Email send failed:", err);
    });

    // Success response
    res.status(201).json({
      success: true,
      id: inquiry.id,
      message: "Inquiry submitted successfully",
    });
  } catch (err) {
    console.error("❌ Create inquiry failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
