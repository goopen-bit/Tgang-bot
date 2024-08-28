import * as dotenv from "dotenv";

/* Load env vars when importing this file*/
dotenv.config();

/**
 * Telegram bot token.
 */
export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
