import axios from "axios";

export type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export const errorHandler = (e: any) => {
  if (axios.isAxiosError(e) && e.response) {
    const { statusCode, message } = e.response.data as ErrorResponse; // as 안쓸 방법이 없을까..?
    console.log(
      `Error :${statusCode ? " " + statusCode + " " : ""} ${message}`
    );
    if (typeof window !== "undefined") {
      alert(message);
    }
  } else {
    console.log(e);
  }
};
