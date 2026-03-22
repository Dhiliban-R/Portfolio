import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

<<<<<<< HEAD
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

let bot;
if (token && chatId) {
  bot = new TelegramBot(token, { polling: true });
}

export async function sendLeadToTelegram(leadData, chatTranscript) {
  if (!bot || !chatId) return;

  const { name, email, phone } = leadData;
  const message = "\n🚀 *NEW LEAD CAPTURED!* 🚀\n━━━━━━━━━━━━━━━━━━━━\n" +
    "👤 *Name:* " + (name || 'N/A') + "\n" +
    "📧 *Email:* " + (email || 'N/A') + "\n" +
    "📱 *Phone:* " + (phone || 'N/A') + "\n\n" +
    "📜 *Chat Transcript Highlights:*\n" +
    chatTranscript.slice(-5).map(m => "*" + m.from + ":* " + m.text).join("\n");

  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: "📧 Email " + name + " Now", callback_data: "send_email:" + email + ":" + name }
        ]
      ]
    }
  };

  try {
    await bot.sendMessage(chatId, message, options);
  } catch (error) {
    console.error('Telegram Notify Error:', error);
  }
}

export function setupCallbackHandler(onEmailRequest) {
  if (!bot) return;

  bot.on('callback_query', async (query) => {
    const [action, email, name] = query.data.split(':');
    
    if (action === 'send_email') {
      await bot.answerCallbackQuery(query.id, { text: "Sending email to " + name + "..." });
      try {
        await onEmailRequest(email, name);
        await bot.editMessageText(query.message.text + "\n\n✅ *Email Sent!*", {
          chat_id: query.message.chat.id,
          message_id: query.message.message_id,
          parse_mode: 'Markdown'
        });
      } catch (err) {
        await bot.sendMessage(chatId, "❌ Failed to send email to " + name + ": " + err.message);
      }
    }
  });
=======
let bot = null;

try {
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_BOT_TOKEN !== 'your_telegram_bot_token_here') {
        bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
        console.log('✅ Telegram bot initialized (polling mode)');
    } else {
        console.log('⚠️  Telegram bot token not set — lead notifications disabled');
    }
} catch (err) {
    console.error('❌ Telegram bot init failed:', err.message);
}

/**
 * Send a lead notification to Dhiliban via Telegram.
 * Button text: "📧 Email [Name] Now"
 */
export async function sendLeadNotification({ name, email, phone, transcript }) {
    if (!bot || !process.env.TELEGRAM_CHAT_ID) {
        console.log('📩 Lead captured (Telegram not configured):', { name, email, phone });
        return false;
    }

    const chatId = process.env.TELEGRAM_CHAT_ID;
    const displayName = name || 'User';

    const message = `🔔 *New Lead from Arthur 😎*

👤 *Name:* ${displayName}
📧 *Email:* ${email || 'Not provided'}
📱 *Phone:* ${phone || 'Not provided'}

💬 *Chat Transcript (last 10):*
${formatTranscript(transcript)}`;

    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [],
        },
    };

    // Inline keyboard: "📧 Email [Name] Now"
    if (email) {
        options.reply_markup.inline_keyboard.push([
            {
                text: `📧 Email ${displayName} Now`,
                callback_data: JSON.stringify({
                    action: 'send_email',
                    to: email,
                    name: displayName,
                }),
            },
        ]);
    }

    try {
        await bot.sendMessage(chatId, message, options);
        console.log(`✅ Lead notification sent to Telegram for "${displayName}"`);
        return true;
    } catch (err) {
        console.error('❌ Telegram send failed:', err.message);
        return false;
    }
}

/**
 * Set up the inline keyboard callback handler.
 * When Dhiliban clicks "📧 Email [Name] Now", this calls the emailSender function
 * which routes to the Resend API.
 */
export function setupCallbackHandler(emailSender) {
    if (!bot) return;

    bot.on('callback_query', async (query) => {
        try {
            const data = JSON.parse(query.data);

            if (data.action === 'send_email') {
                const success = await emailSender({
                    to: data.to,
                    name: data.name,
                });

                if (success) {
                    await bot.answerCallbackQuery(query.id, { text: '✅ Email sent successfully!' });
                    await bot.sendMessage(
                        query.message.chat.id,
                        `✅ "Let's Connect" email sent to *${data.name}* at ${data.to}`,
                        { parse_mode: 'Markdown' }
                    );
                } else {
                    await bot.answerCallbackQuery(query.id, { text: '⚠️ Email service not configured' });
                    await bot.sendMessage(query.message.chat.id, '⚠️ Resend API key not set. Add RESEND_API_KEY to .env');
                }
            }
        } catch (err) {
            console.error('Telegram callback error:', err.message);
            try {
                await bot.answerCallbackQuery(query.id, { text: '❌ Failed to send email' });
            } catch (_) { }
        }
    });

    console.log('✅ Telegram callback handler registered');
}

function formatTranscript(transcript) {
    if (!transcript || !Array.isArray(transcript)) return '_No transcript available_';

    return transcript
        .slice(-10)
        .map((msg) => {
            const icon = msg.role === 'user' ? '👤' : '😎';
            const text = msg.content.length > 120 ? msg.content.slice(0, 120) + '…' : msg.content;
            return `${icon} ${text}`;
        })
        .join('\n');
>>>>>>> d1e5d6de0499b1145bc1811f366b5315801d1d3c
}
