import { FC } from "react";

export type InputProps = {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  initialValue?: string;
  className?: string;
};

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  initialValue,
  className,
}) => {
  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="h-12 rounded-sm"
        type={type}
        placeholder={placeholder}
        value={initialValue}
      ></input>
    </div>
  );
};

export default Input;
