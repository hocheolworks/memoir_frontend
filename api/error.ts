import axios from "axios";
import { toast } from "react-toastify";

export type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export const errorHandler = (e: any) => {
  if (axios.isAxiosError(e) && e.response) {
    const { statusCode, message, error } = e.response.data as ErrorResponse; // as 안쓸 방법이 없을까..?
    // console.log(
    //   `Error :${statusCode ? " " + statusCode + " " : ""} ${message}`
    // );
    if (typeof window !== "undefined") {
      // alert(message);
      console.log(e.response.data);
      toast(
        `${statusCode ? " " + "[" + statusCode + "]" + " " : ""} ${error}`,
        {
          type: "error",
          theme: "colored",
        }
      );
    }
  } else {
    console.log(e);
  }
};
