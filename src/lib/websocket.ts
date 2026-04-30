
/**
 * WebSocket client for AI streaming analysis.
 */

export interface StreamingCallback {
  (chunk: string, isDone: boolean): void;
}

export class AIWebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string = import.meta.env.VITE_AI_WS_URL || 'ws://mock-ai-server.local') {
    this.url = url;
  }

  async analyze(payload: Record<string, unknown>, onUpdate: StreamingCallback): Promise<void> {
    return new Promise((resolve, reject) => {
      // Use MockAIWebSocket if it's our mock URL or no real URL provided
      const isMock = this.url === 'ws://mock-ai-server.local' || !this.url;

      this.socket = isMock
        ? new MockAIWebSocket() as unknown as WebSocket
        : new WebSocket(this.url);

      this.socket.onopen = () => {
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
        reject(err);
      };

      this.socket.onclose = () => {
        this.socket = null;
      };
    });
  }
}

/**
 * Mock WebSocket to simulate streaming AI responses.
 */
class MockAIWebSocket {
  public onopen: (() => void) | null = null;
  public onmessage: ((event: { data: string }) => void) | null = null;
  public onerror: ((err: Event) => void) | null = null;
  public onclose: (() => void) | null = null;

  send(data: string) {
    const payload = JSON.parse(data);
    const viewport = payload.viewport || 'Desktop';

    // Simulate connection delay
    setTimeout(() => {
      this.onopen?.();
      this.simulateStreaming(viewport);
    }, 500);
  }

  private async simulateStreaming(viewport: string) {
    const fullResponse = {
      summary: `Analysis for ${viewport}: The layout is generally well-structured, but several key areas need attention to improve the overall user experience and accessibility.`,
      improvements: [
        {
          element: "Navigation Menu",
          issue: "Touch targets are too small for mobile users.",
          suggestion: "Increase padding and ensure minimum 44x44px target size.",
          severity: 8
        },
        {
          element: "Hero Contrast",
          issue: "Text over image fails WCAG AA contrast ratio.",
          suggestion: "Add a semi-transparent overlay or text shadow.",
          severity: 7
        },
        {
          element: "Font Size",
          issue: "Body text is below 16px, making it hard to read.",
          suggestion: "Set base font size to 16px for better legibility.",
          severity: 5
        }
      ]
    };

    const jsonString = JSON.stringify(fullResponse);
    const chunkSize = 20;
    let currentPos = 0;

    // Stream the JSON string in chunks
    const interval = setInterval(() => {
      const chunk = jsonString.slice(currentPos, currentPos + chunkSize);
      currentPos += chunkSize;
      const done = currentPos >= jsonString.length;

      this.onmessage?.({
        data: JSON.stringify({
          chunk,
          done
        })
      });

      if (done) {
        clearInterval(interval);
        setTimeout(() => this.onclose?.(), 100);
      }
    }, 50);
  }

  close() {
    this.onclose?.();
  }
}
