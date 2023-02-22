import Link from "next/link";
import { FC, useEffect } from "react";
import LabelBtn from "../../components/LabelBtn";

const Login: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_REDIRECT_URI}`}
      >
        <LabelBtn label="Github 로그인"></LabelBtn>
      </a>
    </div>
  );
};

export default Login;
