import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { DefaultProps } from "../utils/types";

export type InputWithFloatingLabelProps = DefaultProps & {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
};

const InputWithFloatingLabel: FC<InputWithFloatingLabelProps> = ({
  id,
  label,
  type,
  placeholder,
  setValue,
  className,
}) => {
  const [timer, setTimer] = useState<number>(); // 디바운싱 타이머
  const [text, setText] = useState<string>(""); // 내부 상태

  const onChangeWithDebouncing = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    // browser side
    if (typeof window !== "undefined") {
      // 디바운싱
      if (timer) {
        window.clearTimeout(timer);
      }
      const newTimer = window.setTimeout(() => {
        setValue(e.target.value);
      }, 260);
      setTimer(newTimer);
    }
  };

  return (
    <div className={"relative" + (className ? ` ${className}` : "")}>
      <input
        id={id}
        className="peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-2.5 pt-4 text-2xl text-gray-900 
                  placeholder:text-white 
                  valid:border-gray-300 invalid:border-red-500 
                  focus:outline-none focus:ring-0 focus:placeholder:text-gray-600 focus:valid:border-point focus:invalid:border-red-600 
                  dark:text-white dark:placeholder:text-black dark:valid:border-gray-600 dark:focus:placeholder:text-gray-600 dark:focus:valid:border-point"
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={onChangeWithDebouncing}
      ></input>
      {label && (
        <label
          htmlFor={id}
          className="absolute top-2 left-1 z-10 origin-[0] -translate-y-6 scale-75 transform rounded-3xl bg-white px-2 text-xl text-gray-500 duration-300 
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
                      peer-valid:text-point peer-invalid:text-red-600 
                      peer-focus:top-2 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 
                      peer-focus:peer-valid:text-point peer-focus:peer-invalid:text-red-600
                      dark:bg-black dark:text-gray-400
                      dark:peer-focus:peer-valid:text-point dark:peer-focus:peer-invalid:text-red-600"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default InputWithFloatingLabel;
