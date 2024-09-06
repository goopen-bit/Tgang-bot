import { createHash } from "node:crypto";
import { market } from "./constants";
import { getUnixTime, startOfDay, subDays } from "date-fns";

const secretKey = "STcHRUjgRaXK3fFn5Pi4rvAMAhKRZGCfqzexFAEiTzU=";

function getDailyHash(date: Date): string {
  const specificTime = startOfDay(date);
  const secondsSinceEpoch = getUnixTime(specificTime);
  return createHash("sha256")
    .update(secretKey + secondsSinceEpoch.toString())
    .digest("hex");
}

export function getMarket(date: Date) {
  const today = date;
  const yesterday = subDays(today, 1);

  const todayHash = getDailyHash(today);
  const yesterdayHash = getDailyHash(yesterday);

  const todayHashInteger = Number.parseInt(todayHash.slice(0, 8), 16);
  const yesterdayHashInteger = Number.parseInt(yesterdayHash.slice(0, 8), 16);

  const marketCopy = JSON.parse(JSON.stringify(market));

  marketCopy.products.forEach((product, index) => {
    let effectToday: number;
    let effectYesterday: number;

    if (index === 0) {
      effectToday = ((todayHashInteger >> (index * 4)) % 11) / 100; // 0% to +10%
      effectYesterday = ((yesterdayHashInteger >> (index * 4)) % 11) / 100; // 0% to +10%
    } else {
      effectToday = (5 + ((todayHashInteger >> (index * 4)) % 26)) / 100;
      effectYesterday = (5 + ((yesterdayHashInteger >> (index * 4)) % 26)) / 100;
    }

    // Determine the direction of the price change
    const priceChangeDirectionToday =
      (todayHashInteger >> (index * 4 + 1)) % 2 === 0 ? 1 : -1;
    const priceChangeDirectionYesterday =
      (yesterdayHashInteger >> (index * 4 + 1)) % 2 === 0 ? 1 : -1;

    effectToday *= priceChangeDirectionToday;
    effectYesterday *= priceChangeDirectionYesterday;

    product.previousPrice = Number((product.price * (1 + effectYesterday)).toFixed(2));
    product.price = Number((product.price * (1 + effectToday)).toFixed(2));
  });

  return marketCopy;
}