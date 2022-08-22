import { FC } from "react";
import { FaSearch } from "react-icons/fa";

type SearchBtnProps = {
  className?: string;
  onClick: () => void;
};

const SearchBtn: FC<SearchBtnProps> = ({
  className,
  onClick,
}: SearchBtnProps) => {
  return (
    <button className={className} onClick={onClick}>
      <FaSearch />
    </button>
  );
};

export default SearchBtn;
