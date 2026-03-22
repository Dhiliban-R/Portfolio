import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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
        service: 'Arthur 😎 Backend v2',
        uptime: process.uptime(),
    });
});

// Set up Telegram callback handler for email button
setupCallbackHandler(async (email, name) => {
    console.log(`Sending follow-up to ${name} <${email}>`);
    return await sendFollowUpEmail(email, name);
});

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
