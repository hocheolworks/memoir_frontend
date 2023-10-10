import React, { useMemo, useEffect, useRef, useState } from "react";
import { NextPage, NextPageContext } from "next/types";
import { PostToBe } from "@utils/types";
import Tag from "@components/Tag";
import Markdown from "@lhjeong60/react-markdown-preview";
import ProfileCard from "@components/ProfileCard";
import CommentInputArea from "@components/CommentInputArea";
import useUser from "../../hooks/useUser";
import CommentList from "@components/CommentList";
import {
  cls,
  extractAnchorFromMarkdown,
  formatAbsolute,
  isBetween,
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
import useLoading from "@hooks/useLoading";
import Head from "next/head";
import { NextSeo } from "next-seo";

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
  const { id, postTitle, createdAt, postBody, postThumbnailImageUrl } = post;

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
  const { nowLoading, nowLoaded } = useLoading();
  const authorDivRef = useRef<HTMLDivElement>(null);
  const anchorNavRootRef = useRef<HTMLDivElement>(null);
  const [anchorNavTop, setAnchorNavTop] = useState(0);

  const deleteThisPost = async () => {
    try {
      nowLoading({ type: "scale", text: "삭제 중.." });
      const { status } = await PostAPI.deletePost(id);

      if (status === 204) {
        toast("게시글 삭제가 완료되었습니다.", {
          type: "success",
          theme: theme === "dark" ? "dark" : "light",
        });

        push(`/${user?.githubUserName}`);
      }
    } catch (e: any) {
      errorHandler(e);
    }

    nowLoaded();
  };

  const isMyPost = user?.githubUserName === author;

  useEffect(() => {
    if (anchorNavRootRef?.current) {
      setAnchorNavTop(
        anchorNavRootRef.current.getBoundingClientRect().top - 64 // 헤더 높이 제외
      );
      console.log(anchorNavRootRef.current);
    }
  }, [anchorNavRootRef]);

  return (
    <>
      <Head>
        <title>{postTitle}</title>
      </Head>
      <NextSeo
        title={postTitle}
        description={formatAbsolute(postBody)}
        openGraph={{
          locale: "ko_KR",
          siteName: "MEMOIR.",
          title: postTitle,
          description: formatAbsolute(postBody),
          images: [
            {
              url:
                postThumbnailImageUrl || "https://mem0ir.com/og/og-memoir.png",
            },
          ],
          url: `https://mem0ir.com/${author}/${id}`,
        }}
      />
      <div className="relative mx-auto flex w-full max-w-[768px] flex-col items-center pt-[88px]">
        <div
          className={cls(
            "absolute top-0 bottom-0 left-full hidden w-[240px] left-area-visible:block"
          )}
          style={{
            paddingTop: anchorNavTop,
          }}
        >
          <AnchorNav
            className={cls("sticky ml-[60px]")}
            style={{
              top: "88px",
            }}
            anchors={anchors}
            onClick={() => {
              setTimeout(() => {
                dispatch(hideHeader());
              }, 0);
            }}
          />
        </div>

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
                <Link href={`/write?id=${id}`}>수정</Link>
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
        <div
          id="anchorNavRoot"
          ref={anchorNavRootRef}
          className="mt-8 w-full"
        ></div>
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
