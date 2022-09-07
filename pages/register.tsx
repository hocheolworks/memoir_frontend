import { FC } from "react";
import Input from "../components/Input";

const Register: FC = () => {
  return (
    <div className="h-full w-full flex justify-items-center items-center">
      <div className="h-full w-full">
        <div>Welcome to MEMOIR</div>
        <p>We need more information of you.</p>
        <p>Log your memories to MEMOIR.</p>
        <Input
          id="register_email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
        ></Input>
        <Input
          id="register_blogname"
          label="Blog Title"
          type="text"
          placeholder="Me, More!"
        ></Input>
      </div>
    </div>
  );
};

export default Register;
