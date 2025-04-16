import axios from "axios";

interface ErrorResponse {
  status: string;
  errors: {
    message: string;
  };
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ErrorResponse;
    if (response && response.errors && response.errors.message) {
      return response.errors.message;
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
