export class GeminiTruncationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiTruncationError';
  }
}
