import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

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
}
