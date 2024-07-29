interface RateLimit {
  isAllowed(key: string): Promise<boolean>;
}

export default RateLimit;
