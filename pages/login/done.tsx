import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { errorHandler } from "../../api/error";
import UserAPI from "../../api/user/userAPI";
import { resetAuth, setAuthUser } from "../../redux/modules/authSlice";
import { dummyUser } from "../../utils/dummy";
import { User } from "../../utils/types";
import { NextPageWithLayout } from "../_app";
import { GridLoader } from "react-spinners";

const LoginDone: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { code } = router.query;

  const asyncWrapper = async () => {
    try {
      const res = await UserAPI.login({ code: code as string });

      if (res.status === 201) {
        const currentUser: User = res.data;
        dispatch(setAuthUser({ ...currentUser }));
        // dispatch(setAuthState(currentUser.isMember));
        router.push(currentUser.isMember ? "/" : "/register");
      } else {
        console.log(`${res.status} Error with Success`);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      dispatch(setAuthUser(dummyUser));
      router.push("/");
      return;
    }

    if (!code) {
      dispatch(resetAuth());
      alert("로그인에 실패했습니다. \n 다시 시도해주세요.");
      router.push("/");
      return;
    }

    asyncWrapper();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <GridLoader loading={code !== undefined} size={"35"} color="#904CF9" />
      <div className="text-bold text-3xl"></div>
    </div>
  );
};

LoginDone.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default LoginDone;
