import { Markup, Telegraf } from "telegraf";
import { telegramBotToken } from "./config/env";

const bot = new Telegraf(telegramBotToken);
bot.start((ctx) =>
	ctx.replyWithPhoto(
		{ url: "https://i.ibb.co/tpvjzq6/telegram-app-baner.png" },
		{
			caption:
				"Welcome to Cartel!\n\n💰 Work your way up the Cartel ranks and make a name for yourself in this intense trading game.\n\n📈 Your goal? Buy low, sell high, and outplay everyone else.\n\n🔫 Attack other players, steal their resources, and take the top spot.\n\n💥 Keep grinding—top players get exclusive airdrops. Prove you’re the best in the Cartel.",
			parse_mode: "Markdown",
			...Markup.inlineKeyboard([
				Markup.button.url(
					"Play Now",
					"https://t.me/cartel_game_bot/cartel?startapp",
				),
				Markup.button.url(
					"Join the community",
					"https://t.me/cartel_game_community",
				),
			]),
		},
	),
);

bot.launch();

console.log("Bot started");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
