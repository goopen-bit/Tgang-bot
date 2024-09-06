import * as dotenv from "dotenv";

/* Load env vars when importing this file*/
dotenv.config();

/**
 * Telegram bot token.
 */
export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

/**
 * Telegram channel id where daily bot will bot a message
 */
export const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID;
