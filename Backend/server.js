import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.js";
import ticketRoute from "./routes/tickets.js";

const app = express();
app.use(express.json());
const allowedOrigins = ["https://ticketing-system-gamma.vercel.app", 'http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoute);

mongoose.connect(process.env.MONGODB_URI).then(
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
);
