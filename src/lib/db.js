import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const { MONGODB_URI, ADMIN_USER, ADMIN_PASS } = process.env;

// Validate environment variables
if (!MONGODB_URI) throw new Error("❌ MONGODB_URI is missing in .env");
if (!ADMIN_USER || !ADMIN_PASS)
  throw new Error("❌ ADMIN_USER or ADMIN_PASS missing in .env");

// Cache connection across hot reloads (useful in dev)
let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectToDatabase() {
  // Reuse cached connection
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log("✅ MongoDB Connected");
        return m;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Failed:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;

  await ensureAdminUser(); // Ensure admin account exists
  return cached.conn;
}

async function ensureAdminUser() {
  const admin = await Admin.findOne({ username: ADMIN_USER });
  if (!admin) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASS, 10);
    await Admin.create({ username: ADMIN_USER, password: hashedPassword });
    console.log(`✅ Default admin created: ${ADMIN_USER}`);
  } else {
    console.log("ℹ️ Admin account already exists");
  }
}
