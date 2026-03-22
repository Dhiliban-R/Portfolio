import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
=======

>>>>>>> d1e5d6de0499b1145bc1811f366b5315801d1d3c
dotenv.config();

import chatRouter from './routes/chat.js';
import emailRouter, { sendFollowUpEmail } from './routes/email.js';
import { setupCallbackHandler } from './services/telegram.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'],
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/chat', chatRouter);
app.use('/send-email', emailRouter);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
<<<<<<< HEAD
        service: 'Arthur 😎 Backend v2',
=======
        service: 'Arthur 😎 Backend',
>>>>>>> d1e5d6de0499b1145bc1811f366b5315801d1d3c
        uptime: process.uptime(),
    });
});

// Set up Telegram callback handler for email button
<<<<<<< HEAD
setupCallbackHandler(async (email, name) => {
    console.log(`Sending follow-up to ${name} <${email}>`);
    return await sendFollowUpEmail(email, name);
});
=======
setupCallbackHandler(sendFollowUpEmail);
>>>>>>> d1e5d6de0499b1145bc1811f366b5315801d1d3c

// Start server
app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════════╗
  ║  😎 Arthur Backend — Running on :${PORT}      ║
  ║  Health: http://localhost:${PORT}/health      ║
  ║  Chat:   POST http://localhost:${PORT}/api/chat║
  ║  Email:  POST http://localhost:${PORT}/send-email║
  ╚════════════════════════════════════════════╝
  `);
});
