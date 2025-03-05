import express from 'express';
import { Ticket } from '../models/Tickets.js';
import authMiddleware from '../middleware/authmideleware.js';

const router = express.Router();

// Create Ticket
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    const ticket = new Ticket({ userId: req.user.userId, title, description });
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Tickets
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tickets = req.user.role === "admin"
    ? await Ticket.find().sort({ createdAt: -1 }) // Newest first
    : await Ticket.find({ userId: req.user.userId });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get Tickets by userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.find({ userId: userId }); 
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user tickets" });
  }
});

// Update Ticket
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
