import React, { useRef, useState } from "react";
import Tag from "./Tag";

type TagInputPropType = {
  tagList: Array<string>;
  setTagList: (tagList: Array<string>) => void;
  className?: string;
};

const TagInput = ({ tagList, setTagList, className }: TagInputPropType) => {
  // const [tagList, setTagList] = useState<Array<string>>([]);
  const [popup, setPopup] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [currentTag, setCurrentTag] = useState<string>("");

  const isAdded = useRef<boolean>(false);
  const isCompositionStart = useRef<boolean>(false);
  const isCompositionEnd = useRef<boolean>(false);

  // FIXME: 발견된 버그 및 개선필요사항 정리
  // 1. (해결완료) Enter로 추가시 다음 키입력 씹히는 버그 발견

  const addTag = (withEnter: boolean, tagName?: string) => {
    if (currentTag === "") {
      return;
    }

    if (tagList.includes(currentTag)) {
      setCurrentTag("");

      if (
        withEnter &&
        !isCompositionEnd.current &&
        isCompositionStart.current
      ) {
        // 한글이 전부 조합되지 않은채라면, onChange 핸들러를 패스하게끔, 그리고 조합관련 플래그 초기화
        isAdded.current = true;
        isCompositionEnd.current = false;
        isCompositionStart.current = false;
      }
      return;
    }

    if (withEnter) {
      if (!isCompositionEnd.current && isCompositionStart.current) {
        // 한글이 전부 조합되지 않은채라면, onChange 핸들러를 패스하게끔, 그리고 조합관련 플래그 초기화
        isAdded.current = true;
        isCompositionEnd.current = false;
        isCompositionStart.current = false;
      }
      setTagList([...tagList, currentTag]);
    } else {
      if (tagName) {
        setTagList([...tagList, tagName]);
      }
    }
    setCurrentTag("");
  };

  return (
    <div className={className ?? ""}>
      <div className="relative -ml-1 flex flex-wrap content-start justify-start">
        {tagList.map((v) => (
          <Tag
            key={v}
            onClick={() => {
              setTagList(tagList.filter((tag) => tag !== v.slice()));
            }}
          >
            {v}
          </Tag>
        ))}
        <input
          className="peer m-1 w-48 bg-white px-1 py-0.5 outline-none dark:bg-black"
          onFocus={() => {
            setPopup(true);
            setIsHidden(false);
          }}
          onBlur={() => setPopup(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTag(true);
            }
          }}
          placeholder="태그를 입력하세요"
          value={currentTag}
          onChange={(e) => {
            if (isAdded.current) {
              isAdded.current = false;
              return;
            }

            if (e.target.value === ",") {
              return;
            }

            if (e.target.value.endsWith(",")) {
              addTag(false, e.target.value.replaceAll(",", ""));
            } else {
              setCurrentTag(e.target.value);
            }
          }}
          onCompositionStart={() => {
            isCompositionStart.current = true;
            isCompositionEnd.current = false;
          }}
          onCompositionEnd={() => {
            if (isCompositionStart.current && !isCompositionEnd.current) {
              isCompositionEnd.current = true;
              isCompositionStart.current = false;
            }
          }}
        ></input>
        <div
          className={
            "absolute -bottom-11 left-1 z-10 origin-bottom animate-slide-up rounded-sm bg-gray-300 py-2 px-4 text-xs dark:bg-gray-600" +
            (popup ? " animate-slide-down" : " animate-slide-up") +
            (isHidden ? " hidden" : "")
          }
          onAnimationEnd={() => {
            if (!popup && !isHidden) setIsHidden(true);
          }}
        >
          태그와 함께 쉼표 또는 엔터를 입력하면 태그가 추가됩니다. <br />
          추가된 태그를 삭제하려면 클릭하세요.
        </div>
      </div>
    </div>
  );
};

export default TagInput;
