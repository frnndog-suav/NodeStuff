export class AppError {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number = 404) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
