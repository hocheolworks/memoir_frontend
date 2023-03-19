import { selectAuthUser } from "@redux/modules/authSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useUserReplace() {
  const user = useSelector(selectAuthUser);
  const { push } = useRouter();

  if (!user) {
    toast("잘못된 접근입니다.", {
      type: "error",
      theme: "colored",
    });
    push("/");
    return;
  }
}
