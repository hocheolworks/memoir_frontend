import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, setAuthUser } from "../../redux/modules/authSlice";

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
          dispatch(setAuthUser({ ...res.data.data }));
          dispatch(setAuthState(true));
          router.push("/");
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
    <div className="w-full h-full flex items-center justify-center">
      Login Done
    </div>
  );
};

export default LoginDone;
