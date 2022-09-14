import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, setAuthUser } from "../../redux/modules/authSlice";
import { User } from "../../utils/types";

const LoginDone: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;
    axios
      .post(
        "/api/users/login",
        JSON.stringify({
          code: code,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          const currentUser: User = res.data;
          dispatch(setAuthUser({ ...currentUser }));
          dispatch(setAuthState(currentUser.isMember));
          router.push(currentUser.isMember ? "/" : "/register");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        if (err) {
          alert("error");
          console.log(err);
        }
      });
  });

  return (
    <div className="flex items-center justify-center w-full h-full">
      Login Done
    </div>
  );
};

export default LoginDone;
