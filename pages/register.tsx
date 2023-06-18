import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { errorHandler } from "@api/error";
import UserAPI from "@api/user/userAPI";
import InputWithFloatingLabel from "@components/InputWithFloatingLabel";
import LabelBtn from "@components/LabelBtn";
import { ValidateEmail } from "@utils/functions";
import { resetToken } from "@token/index";
import axios from "axios";
import { BaseApiError } from "@api/core/types";
import { openModal } from "@components/PopupModal";

const Register: FC = () => {
  const { push, query, isReady } = useRouter();
  const { githubUserName } = query;

  const [email, setEmail] = useState<string>();
  const [blogName, setBlogName] = useState<string>();

  const [disableBtn, setDisableBtn] = useState<boolean>();

  useEffect(() => {
    if (!isReady) return;

    console.log(githubUserName);
    if (!githubUserName) {
      push("/404");
    }
  }, [isReady, githubUserName, push]);

  useEffect(() => {
    if (
      email &&
      blogName &&
      email !== "" &&
      blogName !== "" &&
      ValidateEmail(email)
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [email, blogName]);

  const onSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      if (!blogName || !email) {
        return;
      }

      try {
        await UserAPI.signUp({
          githubUserName: githubUserName as string,
          blogName: blogName,
          email: email,
        });

        openModal({
          title: "회원가입 완료",
          message: "다시 로그인 해주세요.",
          onClickConfirm: () => {
            resetToken();
            push("/");
          },
        });
      } catch (e: any) {
        errorHandler(e);

        if (axios.isAxiosError(e) && e.response) {
          const { statusCode } = e.response.data as BaseApiError; // as 안쓸 방법이 없을까..?
          if (statusCode === 401) {
            push("/");
          }
        }
      }
    },
    [githubUserName, blogName, email, push]
  );

  return (
    <div className="mt-16 flex h-full w-full items-center justify-center">
      <div className="w-[650px] pb-64">
        <h1 className="mb-8 text-6xl font-bold tracking-wider">
          {/* Welcome to MEMOIR. */}
          ME, MORE.
        </h1>
        <p className="mb-8 text-xl leading-8 text-gray-400">
          {/* Almost done! We need more information about you. */}
          거의 완료되었습니다! 몇가지 정보가 더 필요합니다.
          <br />
          {/* Complete the form and Log your memories to MEMOIR. */}
          입력을 완료하고 나만의 회고록을 작성하세요!
        </p>
        <form onSubmit={onSubmit}>
          <InputWithFloatingLabel
            id="register_email"
            className="mb-10"
            label="이메일"
            type="email"
            placeholder="example@mail.com"
            setValue={setEmail}
          ></InputWithFloatingLabel>
          <InputWithFloatingLabel
            id="register_blogName"
            className="mb-32"
            label="블로그 이름"
            type="text"
            placeholder="Me, More!"
            setValue={setBlogName}
          ></InputWithFloatingLabel>

          <LabelBtn
            label="시작하기!"
            rounded="lg"
            className="h-12 text-xl"
            disabled={disableBtn}
          ></LabelBtn>
        </form>
      </div>
    </div>
  );
};

export default Register;
