import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// const authRoutes = require("./routes/authRoutes");
// const ticketRoutes = require("./routes/ticketRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/api/auth", authRoutes);
// app.use("/api/tickets", ticketRoutes);

mongoose.connect(process.env.MONGODB_URI).then(
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
);
