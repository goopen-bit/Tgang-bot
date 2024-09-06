import * as dotenv from "dotenv";

/* Load env vars when importing this file*/
dotenv.config();

/**
 * Telegram bot token.
 */
export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

/**
 * Backend Url to post market updates
 */
export const backendUrl = process.env.BACKEND_URL;

/**
 * Telegram channel id where daily bot will bot a message
 */
export const channelId = process.env.CHANNEL_ID;

/**
 * Telegram channel id where daily bot will bot a message
 */
export const internalApiKey = process.env.INTERNAL_API_KEY;