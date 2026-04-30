
import { MockAIWebSocket } from './mock-websocket';

/**
 * WebSocket client for AI streaming analysis.
 */

export interface StreamingCallback {
  (chunk: string, isDone: boolean): void;
}

export class AIWebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private maxRetries = 3;
  private timeoutMs = 15000;

  constructor(url: string = import.meta.env.VITE_AI_WS_URL || 'ws://mock-ai-server.local') {
    this.url = url;
  }

  async analyze(payload: Record<string, unknown>, onUpdate: StreamingCallback): Promise<void> {
    let attempt = 0;

    const connect = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          this.socket?.close();
          reject(new Error('WebSocket connection timeout'));
        }, this.timeoutMs);

        // Use MockAIWebSocket if it's our mock URL or no real URL provided
        const isMock = this.url === 'ws://mock-ai-server.local' || !this.url;

        try {
          this.socket = isMock
            ? new MockAIWebSocket() as unknown as WebSocket
            : new WebSocket(this.url);
        } catch (err) {
          clearTimeout(timeout);
          reject(err);
          return;
        }

        this.socket.onopen = () => {
          clearTimeout(timeout);
          this.socket?.send(JSON.stringify(payload));
        };

        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            onUpdate(data.chunk, data.done);
            if (data.done) {
              this.socket?.close();
              resolve();
            }
          } catch {
            reject(new Error('Failed to parse WebSocket message'));
          }
        };

        this.socket.onerror = (err) => {
          clearTimeout(timeout);
          reject(err);
        };

        this.socket.onclose = (event) => {
          this.socket = null;
          if (!event.wasClean) {
            reject(new Error('WebSocket closed unexpectedly'));
          }
        };
      });
    };

    while (attempt < this.maxRetries) {
      try {
        await connect();
        return;
      } catch (err) {
        attempt++;
        if (attempt >= this.maxRetries) throw err;

        // Exponential backoff: 1000ms, 2000ms, 4000ms...
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
}
