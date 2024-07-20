import Snowflake from "../Snowflake";
import ShortID from "./ShortID";

class SnowfalkeShortID implements ShortID {
  constructor() {}

  public getShortId(): string {
    const snowflakeId = new Snowflake(1).generateId();

    return this.base64Encode(snowflakeId);
  }

  private base64Encode(id: bigint): string {
    const hex = id.toString();
    const hexBuffer = Buffer.from(hex, "hex");
    const base64 = hexBuffer.toString("base64");
    const base64Url = base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return base64Url;
  }
}

export default SnowfalkeShortID;
