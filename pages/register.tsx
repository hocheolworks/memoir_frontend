import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler } from "@api/error";
import UserAPI from "@api/user/userAPI";
import InputWithFloatingLabel from "@components/InputWithFloatingLabel";
import LabelBtn from "@components/LabelBtn";
import { selectAuthUser, resetAuth } from "@redux/modules/authSlice";
import { ValidateEmail } from "@utils/functions";

const Register: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const [email, setEmail] = useState<string>();
  const [blogName, setBlogName] = useState<string>();

  const [disableBtn, setDisableBtn] = useState<boolean>();

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

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      !blogName ||
      !email ||
      !user ||
      !user.githubId ||
      !user.githubAccessToken
    ) {
      return;
    }

    try {
      const res = await UserAPI.signUp({
        githubId: user.githubId,
        blogName: blogName,
        email: email,
        githubAccessToken: user.githubAccessToken,
      });

      if (res.status === 201) {
        alert("회원가입 완료!, 다시 로그인 해주세요.");
        dispatch(resetAuth());

        router.push("/");
      } else {
        console.log(`${res.status} Error with Success`);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

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
            label="Join Us!"
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
