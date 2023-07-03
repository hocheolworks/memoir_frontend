import React, { useMemo, useEffect, useRef, useState } from "react";
import { NextPage, NextPageContext } from "next/types";
// import PostAPI from "@api/post/postAPI";
import { Post, PostToBe } from "@utils/types";
import Tag from "@components/Tag";
import Markdown from "@lhjeong60/react-markdown-preview";
import ProfileCard from "@components/ProfileCard";
import CommentInputArea from "@components/CommentInputArea";
import useUser from "../../hooks/useUser";
import CommentList from "@components/CommentList";
import {
  cls,
  debounce,
  extractAnchorFromMarkdown,
  getGithubProfileIcon,
  isBetween,
  titleToUrl,
} from "@utils/functions";
import SeriesNav from "@components/SeriesNav";
import AnchorNav from "@components/AnchorNav";
import { useDispatch } from "react-redux";
import { hideHeader } from "@redux/modules/configSlice";
import Link from "next/link";
import { openModal } from "@components/PopupModal";
import PostAPI from "@api/post/postAPI";
import { errorHandler } from "@api/error";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import moment from "moment";

export async function getServerSideProps({ query }: NextPageContext) {
  const { postId } = query;
  const numPostId = parseInt(postId as string) || 0;

  try {
    const { statusCode, data } = await PostAPI.getPostById(numPostId);

    if (statusCode === 200) {
      return {
        props: {
          post: JSON.parse(JSON.stringify(data)),
        },
      };
    }
  } catch (e: any) {
    console.log(e);
    return {
      notFound: true,
    };
  }
}

type PostPageProps = {
  post: PostToBe;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const { id, postTitle, createdAt, postBody } = post;

  const author = post.user.githubUserName;

  const dispatch = useDispatch();

  const anchors = useMemo(
    () => extractAnchorFromMarkdown(postBody),
    [postBody]
  );

  // const seriesLength = seriesList?.length ?? -1;

  // const firstSeriesIndex = 0;
  // const lastSeriesIndex = seriesLength - 1;

  // const prevSeriesIndex = seriesIndex !== undefined ? seriesIndex - 1 : -1;
  // const nextSeriesIndex = seriesIndex !== undefined ? seriesIndex + 1 : -1;

  // const prevSeriesExist = isBetween(
  //   firstSeriesIndex,
  //   lastSeriesIndex,
  //   prevSeriesIndex
  // );
  // const nextSeriesExist = isBetween(
  //   firstSeriesIndex,
  //   lastSeriesIndex,
  //   nextSeriesIndex
  // );

  const user = useUser();
  const { theme } = useTheme();
  const { push } = useRouter();
  const authorDivRef = useRef<HTMLDivElement>(null);
  const anchorNavRootRef = useRef<HTMLDivElement>(null);
  const [anchorNavIsFixed, setAnchorNavIsFixed] = useState(false);

  const deleteThisPost = async () => {
    try {
      const { data } = await PostAPI.deletePost(id);

      if (data.statusCode === "204") {
        toast("게시글 삭제가 완료되었습니다.", {
          type: "success",
          theme: theme === "dark" ? "dark" : "light",
        });

        push(`/${user?.githubUserName}`);
      }
    } catch (e: any) {
      errorHandler(e);
    }
  };

  const isMyPost = user?.githubUserName === author;

  useEffect(() => {
    if (!authorDivRef || !authorDivRef.current) return;

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio < 1) {
          setAnchorNavIsFixed(true);
        } else {
          setAnchorNavIsFixed(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.99 });
    observer.observe(authorDivRef.current);
  }, [authorDivRef]);

  return (
    // TODO: 모바일에서 폰트 사이즈 조절
    <>
      <div className="mx-auto flex w-full max-w-[768px] flex-col items-center pt-[88px]">
        <div className="self-start">
          <h1 className="text-[3rem] font-bold leading-normal">{postTitle}</h1>
        </div>
        <div
          className="flex w-full items-center justify-between pt-8"
          ref={authorDivRef}
        >
          <div>
            <span className="font-medium">{author}</span> ·{" "}
            <span className="text-neutral-400">
              {moment(createdAt).format("YYYY년 MM월 DD일")}
            </span>
          </div>
          {isMyPost && (
            <div>
              <span className="cursor-pointer text-neutral-400 hover:text-black dark:hover:text-white">
                <Link href={`/write?id=${postTitle}`}>수정</Link>
              </span>{" "}
              <span
                className="cursor-pointer text-neutral-400 hover:text-black dark:hover:text-white"
                onClick={() =>
                  openModal({
                    title: "게시글 삭제",
                    message:
                      "정말로 삭제하시겠습니까?\n실수라해도 돌이킬 수 없습니다?",
                    buttonText: "삭제",
                    withCancel: true,
                    onClickConfirm: deleteThisPost,
                  })
                }
              >
                삭제
              </span>
            </div>
          )}
        </div>
        {/* <div className="-ml-1 flex w-full justify-start self-start pt-4">
          {tagList?.map((value, index) => (
            <Tag onClick={() => {}} key={`tag#${index}`}>
              {value}
            </Tag>
          ))}
        </div> */}
        <div ref={anchorNavRootRef} className="relative mt-8 w-full">
          <div
            className={cls(
              "absolute left-full hidden w-[240px] left-area-visible:block"
            )}
          >
            <AnchorNav
              className={cls("ml-[60px]", anchorNavIsFixed ? "fixed" : "")}
              style={{
                top: anchorNavRootRef.current?.getBoundingClientRect().top,
              }}
              anchors={anchors}
              onClick={() => {
                // FIXME: 아래에서 위로 위동할 때, 헤더 표시 안되게 바꿔야해
                dispatch(hideHeader());
              }}
            />
          </div>
        </div>
        {/* {seriesName && (
          <div className="mb-[48px] w-full rounded-lg bg-neutral-200 py-8 px-6 dark:bg-grey1 dark:text-white">
            <h3 className="text-[24px] font-bold">{seriesName}</h3>
          </div>
        )} */}
        <Markdown
          className="w-full bg-white text-black dark:bg-black dark:text-white"
          source={postBody}
        ></Markdown>
        <ProfileCard
          className="mt-80 mb-24 w-full border-t-[1px] border-neutral-200 pt-4 dark:border-neutral-700"
          userName={author}
        />

        {/* {seriesList && seriesLength > 1 && (
          <SeriesNav
            className="mb-72"
            prevSeriesPreview={
              prevSeriesExist ? seriesList[prevSeriesIndex] : undefined
            }
            nextSeriesPreview={
              nextSeriesExist ? seriesList[nextSeriesIndex] : undefined
            }
          />
        )} */}
        {/* {user && (
          <CommentInputArea
            className="mt-16"
            postAuthor={githubId}
            postTitle={postTitle}
            commentCount={commentList?.length ?? 0}
          />
        )}
        {commentList && (
          <CommentList
            className="mt-4 w-full text-center"
            commentList={commentList}
          />
        )} */}
      </div>
    </>
  );
};

export default PostPage;
