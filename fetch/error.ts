import axios from "axios";
import { toast } from "react-toastify";
import { BaseApiError } from "./core/types";

export const errorHandler = (e: BaseApiError) => {
  const { statusCode, message, error } = e;
  if (typeof window !== "undefined") {
    if (statusCode !== 404) {
      console.log(e);
      toast(
        `${statusCode ? "" + "[" + statusCode + "]" + " " : ""} ${message}`,
        {
          type: "error",
          theme: "colored",
        }
      );
    }
  }
};
