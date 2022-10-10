import axios from "axios";

export type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export const errorHandler = (e: any) => {
  if (axios.isAxiosError(e) && e.response) {
    const { statusCode, message } = e.response.data as ErrorResponse;
    console.log(`${statusCode} Error`);
    alert(message);
  } else {
    console.log(e);
  }
};
