import redisClient from "../redisClient";
import RateLimit from "./RateLimit";

class TokenBucket implements RateLimit {
  private MAX_TOKENS = 10;
  private REFILL_INTERVAL = 60;

  public async isAllowed(key: string): Promise<boolean> {
    const currentTime = Date.now();
    const tokenData = await redisClient.hGetAll(key);

    let tokens = parseInt(tokenData.tokens || "0", 10);
    let lastReffil = parseInt(tokenData.lastRefill || `${currentTime}`, 10);
    let timeElapsed = (currentTime - lastReffil) / 1000;

    if (timeElapsed > this.REFILL_INTERVAL) {
      await redisClient.hSet(key, { tokens: 1, lastRefill: currentTime });
      return true;
    }

    if (tokens + 1 > this.MAX_TOKENS) {
      return false;
    }

    await redisClient.hSet(key, {
      tokens: tokens + 1,
      lastRefill: currentTime,
    });

    return Promise.resolve(true);
  }
}

export default TokenBucket;
