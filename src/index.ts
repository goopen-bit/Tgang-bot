import { Markup, Telegraf } from "telegraf";
import {
  telegramBotToken,
  backendUrl,
  channelId,
  internalApiKey,
} from "./config/env";
import * as cron from "node-cron";
import axios from "axios";

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

async function postMarketUpdate() {
  try {
    const response = await axios.get(`${backendUrl}/markets/internal/NY`, {
      headers: {
        "x-api-key": internalApiKey,
      },
    });
    const market = response.data;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    let message = `🏙️ <b>Market Update - ${formattedDate}</b> 📊\n\n`;
    message += "<pre>";
    message += "Product   | Price  | Change \n";
    message += "----------+--------+--------\n";

    let biggestDecrease = { name: "", change: 0 };
    let biggestIncrease = { name: "", change: 0 };

    market.products.forEach((product) => {
      const priceDiff = product.price - product.previousPrice;
      const changePercent = (priceDiff / product.previousPrice) * 100;
      const changeEmoji = priceDiff >= 0 ? "🟢" : "🔴";
      const changeSign = priceDiff >= 0 ? "+" : "";

      message += `${product.name.padEnd(9)} | $${product.price
        .toFixed(2)
        .padStart(6)} | ${changeEmoji} ${changeSign}${changePercent.toFixed(
        2,
      )}%\n`;

      if (changePercent < biggestDecrease.change) {
        biggestDecrease = { name: product.name, change: changePercent };
      }
      if (changePercent > biggestIncrease.change) {
        biggestIncrease = { name: product.name, change: changePercent };
      }
    });

    message += "</pre>\n\n";

    if (biggestDecrease.change < -10) {
      message += `💡 <b>${
        biggestDecrease.name
      }</b> is cheap today (${biggestDecrease.change.toFixed(
        2,
      )}% down). You should probably buy!\n\n`;
    }
    if (biggestIncrease.change > 10) {
      message += `🚀 <b>${
        biggestIncrease.name
      }</b> price is rocketing (${biggestIncrease.change.toFixed(
        2,
      )}% up). Probably time to sell some!\n\n`;
    }

    message += "<i>Remember: Buy low, sell high, and dominate the market!</i>";

    await bot.telegram.sendMessage(channelId, message, { parse_mode: "HTML" });

    console.log("Market update posted successfully");
  } catch (error) {
    console.error("Error posting market update:", error);
  }
}

// Update the cron schedule to run at 22:42 every day
console.log("Setting up cron job...");
cron.schedule("42 22 * * *", () => {
  console.log("Cron job triggered");
  postMarketUpdate();
});

bot
  .launch()
  .then(() => {
    console.log("Bot started successfully");
  })
  .catch((error) => {
    console.error("Error starting bot:", error);
  });

console.log("Bot initialization completed");

// Enable graceful stop
process.once("SIGINT", () => {
  console.log("SIGINT received. Stopping bot...");
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  console.log("SIGTERM received. Stopping bot...");
  bot.stop("SIGTERM");
});
