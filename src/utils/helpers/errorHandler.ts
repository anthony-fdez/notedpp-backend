export class ErrorHandler extends Error {
  private _statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this._statusCode = statusCode;
  }

  public set statusCode(statusCode: number) {
    this._statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}
