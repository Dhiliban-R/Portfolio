import { Router } from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

let resend = null;
try {
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_resend_api_key_here') {
        resend = new Resend(process.env.RESEND_API_KEY);
        console.log('✅ Resend email initialized');
    } else {
        console.log('⚠️  Resend API key not set — email sending disabled');
    }
} catch (err) {
    console.error('❌ Resend init failed:', err.message);
}

/**
 * POST /send-email
 * Body: { to: string, name: string, transcript?: string }
 * Sends a follow-up email from Dhiliban to the lead.
 */
router.post('/', async (req, res) => {
    try {
        const { to, name, transcript } = req.body;

        if (!to) {
            return res.status(400).json({ error: 'Recipient email (to) is required' });
        }

        if (!resend) {
            console.log('📧 Email would be sent to:', to, '(Resend not configured)');
            return res.json({
                success: false,
                message: 'Email service not configured. Set RESEND_API_KEY in .env',
            });
        }

        const { data, error } = await resend.emails.send({
            from: 'Dhiliban Raja <onboarding@resend.dev>',
            to: [to],
            subject: `Hey ${name || 'there'}! Thanks for visiting my portfolio 😎`,
            html: buildEmailHtml(name, transcript),
        });

        if (error) {
            console.error('Email send error:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        console.log('✅ Email sent:', data);
        res.json({ success: true, id: data.id });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
});

function buildEmailHtml(name, transcript) {
    return `
    <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #060b14; color: #f0f4ff; padding: 40px 30px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; margin: 0; background: linear-gradient(135deg, #0066AE, #14E885); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Dhiliban Raja
        </h1>
        <p style="color: #8b9ab5; font-size: 14px; margin-top: 8px;">CS Undergrad • Full-Stack Developer • AI Enthusiast</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <p style="font-size: 16px; line-height: 1.6; margin: 0;">
          Hey ${name || 'there'}! 👋
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #a0aec0; margin-top: 12px;">
          Thanks for chatting with Arthur on my portfolio! I noticed you seemed interested in my work, so I wanted to reach out personally.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #a0aec0; margin-top: 12px;">
          I'd love to connect and discuss how we can work together. Feel free to reply to this email or reach out on LinkedIn.
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://linkedin.com" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #0066AE, #14E885); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
          Let's Connect →
        </a>
      </div>

      <p style="text-align: center; color: #4a5568; font-size: 12px; margin-top: 30px;">
        Sent from Dhiliban's portfolio • Built with ❤️ and Arthur 😎
      </p>
    </div>
  `;
}

/**
 * Export the email sending function for use by Telegram callback.
 */
export async function sendFollowUpEmail({ to, name }) {
    if (!resend) {
        console.log('📧 Email skipped (not configured):', to);
        return false;
    }

    try {
        const { error } = await resend.emails.send({
            from: 'Dhiliban Raja <onboarding@resend.dev>',
            to: [to],
            subject: `Hey ${name || 'there'}! Thanks for visiting my portfolio 😎`,
            html: buildEmailHtml(name),
        });

        return !error;
    } catch (err) {
        console.error('Email send failed:', err.message);
        return false;
    }
}

export default router;
