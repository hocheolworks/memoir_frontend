import React, { useRef, useState } from "react";
import Tag from "./Tag";

type TagInputPropType = {
  className?: string;
};

const TagInput = ({ className }: TagInputPropType) => {
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [popup, setPopup] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<string>("");

  const isAdded = useRef<boolean>(false);

  // TODO: Enter로 추가시 다음 키입력 씹히는 버그 발견

  const addTag = (withEnter: boolean, tagName?: string) => {
    if (currentTag === "") {
      return;
    }

    if (tagList.includes(currentTag)) {
      setCurrentTag("");
      return;
    }

    if (withEnter) {
      isAdded.current = true;
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
            // console.log("keydown");
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
        ></input>
        <div
          className={
            "absolute -bottom-11 left-1 z-10 origin-bottom animate-slide-up rounded-sm bg-gray-600 py-2 px-4 text-xs" +
            (popup ? " animate-slide-bottom" : " animate-slide-up") +
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
