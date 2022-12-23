import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { errorHandler } from "../../api/error";
import UserAPI from "../../api/user/userAPI";
import { setAuthState, setAuthUser } from "../../redux/modules/authSlice";
import { User } from "../../utils/types";

const LoginDone: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { code } = router.query;

  const asyncWrapper = async () => {
    if (!code) return;

    try {
      const res = await UserAPI.login({ code: code as string });

      if (res.status === 201) {
        const currentUser: User = res.data;
        dispatch(setAuthUser({ ...currentUser }));
        dispatch(setAuthState(currentUser.isMember));
        router.push(currentUser.isMember ? "/" : "/register");
      } else {
        console.log(`${res.status} Error with Success`);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  useEffect(() => {
    asyncWrapper();
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      Login Done
    </div>
  );
};

export default LoginDone;
