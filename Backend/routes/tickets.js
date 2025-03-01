import express from 'express'
import { Ticket } from '../models/Tickets.js';
import authMiddleware from '../middleware/authmideleware.js'

const router = express.Router();

// Create Ticket
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const ticket = new Ticket({ userId: req.user.userId, title, description });
  await ticket.save();
  res.status(201).json(ticket);
});

// Get Tickets
router.get("/", authMiddleware, async (req, res) => {
  const tickets = req.user.role === "admin"
    ? await Ticket.find()
    : await Ticket.find({ userId: req.user.userId });

  res.json(tickets);
});

// Update Ticket
router.put("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });

  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});

export default router;
