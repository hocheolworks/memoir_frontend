import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler } from "../api/error";
import UserAPI from "../api/user/userAPI";
import InputWithFloatingLabel from "../components/InputWithFloatingLabel";
import LabelBtn from "../components/LabelBtn";
import { selectAuthUser, resetAuth } from "../redux/modules/authSlice";
import { ValidateEmail } from "../utils/functions";

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
    <div className="flex items-center justify-center w-full h-full mt-16">
      <div className="w-[650px] pb-64">
        <h1 className="mb-8 text-6xl font-bold tracking-wider">
          Welcome to MEMOIR.
        </h1>
        <p className="mb-24 text-xl leading-8 text-gray-400">
          Almost done! We need more information about you.
          <br />
          Complete the form and Log your memories to MEMOIR.
        </p>
        <form onSubmit={onSubmit}>
          <InputWithFloatingLabel
            id="register_email"
            className="mb-10"
            label="Email"
            type="email"
            placeholder="example@mail.com"
            setValue={setEmail}
          ></InputWithFloatingLabel>
          <InputWithFloatingLabel
            id="register_blogName"
            className="mb-32"
            label="Blog Name"
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
