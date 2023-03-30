import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { errorHandler } from "@api/error";
import UserAPI from "@api/user/userAPI";
import { resetAuth, setAuthUser } from "@redux/modules/authSlice";
import { dummyUser } from "@utils/dummy";
import { GridLoader } from "react-spinners";
import Link from "next/link";
import { NextPage } from "next/types";

const LoginDone: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { code } = router.query;
  const homeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const asyncWrapper = async (timeout: number) => {
      try {
        const res = await UserAPI.signIn({ code: code as string });

        if (res.isMemoirUser) {
          const user = await UserAPI.me();

          dispatch(setAuthUser(user));
          router.push("/");
        } else {
          router.push(`/register?githubUserName=${res.githubUserName}`);
        }
        clearTimeout(timeout);
      } catch (e: any) {
        errorHandler(e);
      }
    };

    if (!router.isReady) {
      return;
    }

    if (process.env.NODE_ENV === "development") {
      dispatch(setAuthUser(dummyUser));
      router.push("/");
      return;
    }

    if (!code) {
      dispatch(resetAuth());
      alert("Github 로그인에 실패했습니다. \n다시 시도해주세요.");
      router.push("/");
      return;
    }

    const timeout = window.setTimeout(() => {
      if (homeLinkRef && homeLinkRef.current) {
        homeLinkRef.current.style.opacity = "1";
      }
    }, 5000);

    try {
      asyncWrapper(timeout);
    } catch (e) {
      router.push("/");
    }
  }, [router.isReady, code, dispatch, router]);

  return (
    <div className="right- fixed top-0 bottom-0 left-0 z-20 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-70">
      <GridLoader
        loading={code !== undefined || process.env.NODE_ENV === "development"}
        size={30}
        color="#904CF9"
      />
      <Link
        href={"/"}
        className="mt-4 rounded-md bg-neutral-200 py-1 px-5 text-lg opacity-0 transition-opacity duration-700 hover:brightness-90 dark:bg-neutral-700"
        ref={homeLinkRef}
      >
        홈으로
      </Link>
    </div>
  );
};

export default LoginDone;
