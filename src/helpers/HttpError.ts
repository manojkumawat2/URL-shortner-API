class HttpError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  statusCode: number;

  constructor(message: string = "", statusCode: number = 200) {
    this.message = message;
    this.name = "";
    this.statusCode = statusCode;
  }
}

export default HttpError;
