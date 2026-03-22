import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function sendFollowUpEmail(email, name) {
  if (!process.env.RESEND_API_KEY) throw new Error('Resend Key Missing');

  const { data, error } = await resend.emails.send({
    from: 'Dhiliban Raja <onboarding@resend.dev>', // Replace with your verified domain
    to: email,
    subject: "Let's Connect, " + name + "! 😎",
    html: "<div style='font-family: sans-serif; line-height: 1.5; color: #333;'>\n" +
      "  <h2>Hey " + name + "! 😎</h2>\n" +
      "  <p>I saw you were chatting with <strong>Arthur</strong> on my portfolio. 🚀</p>\n" +
      "  <p>It's awesome to meet you! I'm Dhiliban, a CS undergrad and full-stack developer. I'd love to discuss how we can work together or talk about high-performance projects and Agentic AI.</p>\n" +
      "  <p>Feel free to reply to this email or reach out on <a href='https://linkedin.com/in/dhilibanraja'>LinkedIn</a>.</p>\n" +
      "  <br />\n" +
      "  <p>Best regards,<br /><strong>Dhiliban Raja</strong></p>\n" +
      "</div>",
  });

  if (error) throw error;
  return data;
}

router.post('/send-email', async (req, res) => {
  const { email, name } = req.body;
  try {
    const result = await sendFollowUpEmail(email, name);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
