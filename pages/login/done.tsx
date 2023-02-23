import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { errorHandler } from "@api/error";
import UserAPI from "@api/user/userAPI";
import { resetAuth, setAuthUser } from "@redux/modules/authSlice";
import { dummyUser } from "@utils/dummy";
import { User } from "@utils/types";
import { NextPageWithLayout } from "@pages/_app";
import { GridLoader } from "react-spinners";
import Link from "next/link";
import { setGithubToken } from "@token/index";

const LoginDone: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { code } = router.query;
  const homeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        const res = await UserAPI.login({ code: code as string });

        if (res.status === 201) {
          const currentUser: User = res.data;
          dispatch(setAuthUser({ ...currentUser }));
          setGithubToken(currentUser.githubAccessToken);

          router.push(currentUser.isMember ? "/" : "/register");
        } else {
          console.log(`${res.status} Error with Success`);
        }
      } catch (e) {
        errorHandler(e);
      }
    };

    if (!router.isReady) {
      return;
    }

    if (process.env.NODE_ENV === "development") {
      dispatch(setAuthUser(dummyUser));
      setGithubToken(dummyUser.githubAccessToken);
      router.push("/");
      return;
    }

    if (!router.isReady) return;

    if (!code) {
      dispatch(resetAuth());
      alert("로그인에 실패했습니다. \n다시 시도해주세요.");
      router.push("/");
      return;
    }
    const timeout = setTimeout(() => {
      if (homeBtnRef && homeBtnRef.current) {
        homeBtnRef.current.style.display = "block";
      }
    }, 5000);

    try {
      asyncWrapper();
    } catch (e) {
      console.log("aa");
      router.push("/");
    }

    clearTimeout(timeout);
  }, [router.isReady, code, dispatch, router]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <GridLoader
        loading={code !== undefined || process.env.NODE_ENV === "development"}
        size={30}
        color="#904CF9"
      />
      <Link href={"/"}>
        <button
          className="collapse mt-4 rounded-md bg-neutral-200 py-1 px-5 text-lg hover:brightness-90 dark:bg-neutral-700"
          ref={homeBtnRef}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
};

LoginDone.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default LoginDone;
