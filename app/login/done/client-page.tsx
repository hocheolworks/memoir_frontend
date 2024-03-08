"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { errorHandler } from "@api/error";
import UserAPI from "@api/user/userAPI";
import { resetAuth, setAuthUser } from "@redux/modules/authSlice";
import { dummyUser } from "@utils/dummy";
import { GridLoader } from "react-spinners";
import Link from "next/link";
import { NextPageWithLayout } from "_pages/_app";
import { openModal } from "@components/PopupModal";

const LoginDoneClientPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
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

    if (process.env.NODE_ENV === "development") {
      dispatch(setAuthUser(dummyUser));
      router.push("/");
      return;
    }

    if (!code) {
      dispatch(resetAuth());
      openModal({
        title: "로그인 실패",
        message: "Github 로그인에 실패했습니다.",
        onClickConfirm: () => {
          router.push("/");
        },
      });

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
  }, [code, dispatch, router]);

  return (
    <div className="full-page z-20 flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-70 dark:bg-black">
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

LoginDoneClientPage.getLayout = (page: ReactElement) => page;

export default LoginDoneClientPage;
