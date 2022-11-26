import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../redux/modules/authSlice";
import BottomBtn from "./BottomBtn";
import ContainerWithTitle from "./ContainerWithTitle";

type AddToSeriesAreaProps = {
  className?: string;
};

const AddToSeriesArea: FC<AddToSeriesAreaProps> = ({ className }) => {
  const user = useSelector(selectAuthUser);

  const [series, setSeries] = useState<string[]>([
    "React",
    "Vue",
    "Next",
    "CSS",
    "HTML",
    "Tailwindcss",
    "Redux",
  ]);
  const [newSeries, setNewSeries] = useState<string>("");
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [seriesUrl, setSeriesUrl] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isCancelClicked, setIsCancelClicked] = useState<boolean>(false);

  useLayoutEffect(() => {
    // const dummySeries = [
    //   "React",
    //   "Vue",
    //   "Next",
    //   "CSS",
    //   "HTML",
    //   "Tailwindcss",
    //   "Redux",
    // ];
    // setSeries(dummySeries);
  }, []);

  const onClickAddSeries = () => {
    // 시리즈 추가 api 호출
  };

  return (
    <ContainerWithTitle className={className} title="시리즈 설정">
      <div className="flex flex-1 flex-col rounded-sm bg-neutral-200 dark:bg-neutral-700">
        <div
          className={`w-full px-4 py-4 outline-none transition-all ease-in
          ${isFocused ? "h-[9.5rem]" : "h-16"}`}
        >
          <input
            className="w-full bg-neutral-100 py-1 px-2 outline-none dark:bg-neutral-800"
            value={newSeries}
            onChange={(e) => setNewSeries(e.target.value)}
            placeholder="새로운 시리즈를 입력하세요."
            onFocus={() => setIsFocused(true)}
          />
          {isFocused && (
            <>
              <div
                className={`mt-2.5 flex
              ${isCancelClicked ? " animate-fade-out" : " animate-fade-in"}`}
                onAnimationStart={() => {
                  if (isCancelClicked) {
                    setIsCancelClicked(false);
                    setIsFocused(false);
                  }
                }}
              >
                <div className="self-center bg-neutral-100 py-1 pl-2 text-neutral-500 dark:bg-neutral-800">
                  /@{user.githubId}/series/
                </div>
                <input
                  className="w-full flex-1 appearance-none bg-neutral-100 py-1 focus:outline-none dark:bg-neutral-800"
                  value={seriesUrl}
                  onChange={(e) => setSeriesUrl(e.target.value)}
                />
              </div>
              <div className="mt-1 flex items-center justify-end">
                <BottomBtn
                  onClick={() => {
                    setIsCancelClicked(true);
                  }}
                >
                  취소
                </BottomBtn>
                <BottomBtn
                  onClick={onClickAddSeries}
                  className="-mr-2"
                  isPoint={true}
                >
                  추가하기
                </BottomBtn>
              </div>
            </>
          )}
        </div>
        <ul className="h-[290px] resize-none overflow-y-auto">
          {series.map((value) => (
            <li
              className={`border-b-[1px] border-neutral-50 py-3.5 px-4 text-left text-sm dark:border-neutral-500${
                value === selectedSeries
                  ? " bg-point text-white brightness-95"
                  : ""
              }`}
              onClick={() => setSelectedSeries(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </ContainerWithTitle>
  );
};

export default AddToSeriesArea;
