import { FC } from "react";
import InputWithFloatingLabel from "../components/InputWithFloatingLabel";
import LabelBtn from "../components/LabelBtn";

const Register: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[650px] pb-64">
        <h1 className="mb-8 text-6xl font-bold tracking-wider">
          Welcome to MEMOIR.
        </h1>
        <p className="mb-24 text-xl leading-8 text-gray-400">
          Almost done! We need more information about you.
          <br />
          Complete the form and Log your memories to MEMOIR.
        </p>
        <InputWithFloatingLabel
          id="register_email"
          className="mb-10"
          label="Email"
          type="email"
          placeholder="example@mail.com"
        ></InputWithFloatingLabel>
        <InputWithFloatingLabel
          id="register_title"
          className="mb-32"
          label="Blog Title"
          type="text"
          placeholder="Me, More!"
        ></InputWithFloatingLabel>

        <LabelBtn
          label="Join Us!"
          rounded="lg"
          className="h-12 text-xl"
        ></LabelBtn>
      </div>
    </div>
  );
};

export default Register;
