class ShortUrl {
  shortId: string;
  serverAddress: string;

  constructor(shortId: string) {
    this.shortId = shortId;
    this.serverAddress = process.env.SERVER_ADDRESS || "";
  }

  getShortUrl(): string {
    return `${this.serverAddress}/${this.shortId}`;
  }
}

export default ShortUrl;
