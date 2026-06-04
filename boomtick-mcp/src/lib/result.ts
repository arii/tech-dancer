export type ToolFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ToolSuccess<T> = {
  success: true;
  data: T;
  warnings?: string[];
};

export type ToolResult<T> = ToolSuccess<T> | ToolFailure;

export function ok<T>(data: T, warnings?: string[]): ToolSuccess<T> {
  return warnings && warnings.length > 0 ? { success: true, data, warnings } : { success: true, data };
}

export function fail(code: string, message: string, details?: unknown): ToolFailure {
  return details === undefined
    ? { success: false, error: { code, message } }
    : { success: false, error: { code, message, details } };
}

export function asToolContent(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(value, null, 2),
      },
    ],
    structuredContent: value as Record<string, unknown>,
  };
}
