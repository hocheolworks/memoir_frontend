import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../redux/modules/authSlice";
import BottomBtn from "./BottomBtn";
import ContainerWithTitle from "./ContainerWithTitle";

type AddToSeriesAreaProps = {
  className?: string;
  selectedSeries: string;
  setSelectedSeries: (selectedSeries: string) => void;
  getOut: () => void;
};

const AddToSeriesArea: FC<AddToSeriesAreaProps> = ({
  className,
  selectedSeries,
  setSelectedSeries,
  getOut,
}) => {
  const user = useSelector(selectAuthUser);

  const [existingSeries, setExistingSeries] = useState<string[]>([
    "React",
    "Vue",
    "Next",
    "CSS",
    "HTML",
    "Tailwindcss",
    "Redux",
  ]);
  const [clickedSeries, setClickedSeries] = useState<string>(selectedSeries);
  const [newSeries, setNewSeries] = useState<string>("");
  const [seriesUrl, setSeriesUrl] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isCancelClicked, setIsCancelClicked] = useState<boolean>(false);

  const isUrlModified = useRef<boolean>(false);

  useLayoutEffect(() => {}, []);

  const onClickAddSeries = () => {
    // 시리즈 추가 api 호출
  };

  return (
    <ContainerWithTitle className={className} title="시리즈 설정">
      <div className="flex flex-1 flex-col rounded-sm">
        <div
          className={`w-full rounded-t-sm bg-neutral-200 p-4 outline-none transition-all duration-300 ease-out dark:bg-neutral-700
          ${isFocused ? "h-[9.7rem]" : "h-16"}`}
        >
          <input
            className="w-full bg-neutral-100 py-1 px-2 outline-none dark:bg-neutral-800"
            value={newSeries}
            onChange={(e) => {
              setNewSeries(e.target.value);
              if (!isUrlModified.current) {
                setSeriesUrl(e.target.value);
              }
            }}
            placeholder="새로운 시리즈를 입력하세요."
            onFocus={() => setIsFocused(true)}
          />
          {isFocused && (
            <div
              className={`${
                isCancelClicked ? "animate-fade-out" : "animate-fade-in"
              }`}
              onAnimationEnd={() => {
                if (isCancelClicked) {
                  setIsCancelClicked(false);
                  setIsFocused(false);
                }
              }}
            >
              <div className={`mt-2.5 flex`}>
                <div className="self-center bg-neutral-100 py-1 pl-2 text-neutral-500 dark:bg-neutral-800">
                  /@{user.githubId}/series/
                </div>
                <input
                  className="w-full flex-1 appearance-none bg-neutral-100 py-1 focus:outline-none dark:bg-neutral-800"
                  value={seriesUrl}
                  onChange={(e) => setSeriesUrl(e.target.value)}
                  onKeyDown={() => {
                    if (!isUrlModified.current) {
                      isUrlModified.current = true;
                    }
                  }}
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
            </div>
          )}
        </div>
        <ul className="h-[295px] resize-none overflow-y-auto rounded-b-sm bg-neutral-200 dark:bg-neutral-700">
          {existingSeries.map((value, idx) => (
            <li
              className={`cursor-pointer border-b-[1px] border-neutral-50 py-3.5 px-4 text-left text-sm dark:border-neutral-500${
                value === clickedSeries
                  ? " bg-point text-white brightness-95"
                  : " hover:bg-neutral-300 dark:hover:bg-neutral-600"
              }`}
              onClick={() => setClickedSeries(value)}
              key={`series#${idx}`}
            >
              {value}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex w-full flex-1 items-end justify-end">
          <BottomBtn onClick={getOut}>취소</BottomBtn>
          <BottomBtn
            className="-mr-2"
            isPoint={true}
            onClick={() => {
              setSelectedSeries(clickedSeries);
              getOut();
            }}
            isDisabled={!Boolean(clickedSeries)}
          >
            선택하기
          </BottomBtn>
        </div>
      </div>
    </ContainerWithTitle>
  );
};

export default AddToSeriesArea;
