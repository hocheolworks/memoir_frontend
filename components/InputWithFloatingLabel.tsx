import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";

export type InputWithFloatingLabelProps = {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  className?: string;
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
        className="placeholder:text-white dark:placeholder:text-black focus:placeholder:text-gray-600 dark:focus:placeholder:text-gray-600 block px-2.5 pb-2.5 pt-4 w-full text-2xl text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={onChangeWithDebouncing}
      ></input>
      {label && (
        <label
          htmlFor={id}
          className="absolute rounded-3xl text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default InputWithFloatingLabel;
