import { Markup, Telegraf } from "telegraf";
import { telegramBotToken, telegramChannelId } from "./config/env";
import { CronJob } from "cron";
import { getMarket } from "./market";
import { ProductIcon } from "./constants";

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

function craftMessage(currentDate: Date) {
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  let message = `🏙️ <b>Market Update - ${formattedDate}</b> 📊\n\n`;
  message += "<pre>";
  message += "#   | Price  | Change \n";
  message += "----------+--------+--------\n";

  let biggestDecrease = { name: "", change: 0 };
  let biggestIncrease = { name: "", change: 0 };

  const market = getMarket(currentDate);

  for (const product of market.products) {
    const priceDiff = product.price - product.previousPrice;
    const changePercent = (priceDiff / product.previousPrice) * 100;
    const changeEmoji = priceDiff >= 0 ? "🟢" : "🔴";
    const changeSign = priceDiff >= 0 ? "+" : "";
    const productIcon = ProductIcon[product.name];

    message += `${productIcon.padEnd(1)} | $${product.price
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
  }

  message += "</pre>\n\n";
  message += "<i>*Base buy price does not include your personal discount.</i>\n\n";

  if (biggestDecrease.change < -10) {
    message += `💡 <b>${
      biggestDecrease.name
    }</b> is cheap today (${biggestDecrease.change.toFixed(2)}% down).\n\n`;
  }
  if (biggestIncrease.change > 10) {
    message += `🚀 <b>${
      biggestIncrease.name
    }</b> price is rocketing (${biggestIncrease.change.toFixed(2)}% up).\n\n`;
  }
  return message;
}

async function postMarketUpdate() {
  const today = new Date();

  const message = craftMessage(today);
  await bot.telegram.sendMessage(telegramChannelId, message, {
    parse_mode: "HTML",
  });
}

const job = new CronJob("1 0 * * *", () => {
  console.log("Cron job triggered");
  postMarketUpdate();
});

bot.catch((err) => {
  console.error("Error in bot", err);
});

bot.launch();
console.log("Bot started successfully");

job.start();
console.log("Cron job started successfully");

// Enable graceful stop
process.once("SIGINT", () => {
  console.log("SIGINT received. Stopping bot...");
  job.stop();
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  console.log("SIGTERM received. Stopping bot...");
  job.stop();
  bot.stop("SIGTERM");
});
