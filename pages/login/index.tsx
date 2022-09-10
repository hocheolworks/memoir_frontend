import Link from "next/link";
import { FC, useEffect } from "react";
import LabelBtn from "../../components/LabelBtn";

const Login: FC = () => {
  useEffect(() => {
    console.log(process.env);
  });
  return (
    <div className="flex items-center justify-center w-full h-full">
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_REDIRECT_URI}`}
      >
        <LabelBtn label="Github 로그인"></LabelBtn>
      </a>
    </div>
  );
};

export default Login;
