export type ToolSuccess<T> = {
  success: true;
  data: T;
  warnings?: string[];
};

export type ToolFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    remediation?: string;
  };
  warnings?: string[];
};

export type ToolResult<T> = ToolSuccess<T> | ToolFailure;

export function ok<T>(data: T, warnings?: string[]): ToolSuccess<T> {
  return warnings?.length ? { success: true, data, warnings } : { success: true, data };
}

export function fail(code: string, message: string, remediation?: string, warnings?: string[]): ToolFailure {
  return {
    success: false,
    error: remediation ? { code, message, remediation } : { code, message },
    ...(warnings?.length ? { warnings } : {}),
  };
}
