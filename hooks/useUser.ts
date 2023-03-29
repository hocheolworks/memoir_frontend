import { useSelector } from "react-redux";
import { selectAuthUser } from "@redux/modules/authSlice";

export default function useUser() {
  const user = useSelector(selectAuthUser);

  return user;
}
