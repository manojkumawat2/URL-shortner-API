/**
 * @class Snowflake
 *
 * Twitter Snowflake ID generator
 */
class Snowflake {
  private static readonly EPOCH = 1577836800000; // Start of 2020-01-01 in milliseconds
  private static readonly MACHINE_ID_BITS = 5;

  private static readonly MAX_MACHINE_ID =
    -1 ^ (-1 << Snowflake.MACHINE_ID_BITS);

  private sequence: number = 0;

  constructor(private machineId: number) {
    if (machineId > Snowflake.MAX_MACHINE_ID || machineId < 0) {
      throw new Error(
        `Machine ID can't be greater than ${Snowflake.MAX_MACHINE_ID} or less than 0`
      );
    }
  }

  public generateId(timestamp = new Date()): bigint {
    let epochTimestamp;
    if (timestamp instanceof Date) {
      epochTimestamp = timestamp.valueOf();
    } else {
      epochTimestamp = new Date(timestamp).valueOf();
    }

    let id = BigInt(epochTimestamp - Snowflake.EPOCH) << BigInt(22);
    id = id | (BigInt(this.machineId) << BigInt(12));
    id = id | BigInt(this.sequence++);

    return id;
  }
}

export default Snowflake;
