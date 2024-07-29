import TokenBucket from "./TokenBucket";

export enum RATELIMTING_ALGORITHMNS {
  TOKEN_BUCKET = "TOKEN_BUCKET",
}

class RateLimittingFactory {
  public isAllowed(
    key: string,
    algorithm: string = RATELIMTING_ALGORITHMNS.TOKEN_BUCKET
  ): Promise<Boolean> {
    if (algorithm === RATELIMTING_ALGORITHMNS.TOKEN_BUCKET) {
      return new TokenBucket().isAllowed(key);
    }

    throw new Error("Invalid rate limiting algorithm.");
  }
}

export default RateLimittingFactory;
