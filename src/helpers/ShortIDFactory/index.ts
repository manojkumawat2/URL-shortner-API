import ShortIDAlgorithms from "./constants";
import SnowfalkeShortID from "./SnowflakeShortID";

class ShortIDFactory {
  public getShortId(algorithm: ShortIDAlgorithms) {
    if (algorithm === ShortIDAlgorithms.SnowflakeShortID) {
      return new SnowfalkeShortID().getShortId();
    }

    return null;
  }
}

export default ShortIDFactory;
