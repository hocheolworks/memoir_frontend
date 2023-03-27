import React from "react";
import { NextPage } from "next";
import { NextPageContext } from "next/types";
import PostAPI from "@api/post/postAPI";
import { dummyPost } from "@utils/dummy";
import { Post } from "@utils/types";
import Tag from "@components/Tag";
import Markdown from "@lhjeong60/react-markdown-preview";
import ProfileCard from "@components/ProfileCard";

export async function getServerSideProps({ query }: NextPageContext) {
  const { postId } = query;

  // const res = await PostAPI.getPostById((postId as string) ?? "");

  return {
    props: {
      post: dummyPost,
    },
  };
}

type PostPageProps = {
  post: Post;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const {
    title,
    githubId,
    createDate,
    tagList,
    seriesName,
    seriesIndex,
    seriesList,
    content,
    commentList,
  } = post;

  return (
    <div className="mx-auto flex w-[768px] flex-col items-center pt-[88px]">
      <div>
        <h1 className="text-[48px] font-bold leading-[72px]">{title}</h1>
      </div>
      <div className="self-start pt-8">
        <p>
          <span className="font-medium">{githubId}</span> ·{" "}
          <span className="text-neutral-400">{createDate}</span>
        </p>
      </div>
      <div className="-ml-1 flex justify-start self-start pt-4">
        {post.tagList?.map((value, index) => (
          <Tag onClick={() => {}} key={`tag#${index}`}>
            {value}
          </Tag>
        ))}
      </div>
      <div className="mt-8 w-full rounded-lg bg-neutral-200 py-8 px-6 dark:bg-grey1 dark:text-white">
        <h3 className="text-[24px] font-bold">{seriesName}</h3>
      </div>
      <Markdown
        className="mt-[80px] w-full bg-white text-black dark:bg-black dark:text-white"
        source={content}
      ></Markdown>
      <ProfileCard
        className="mt-48 mb-24 w-full border-t-[1px] border-neutral-200 pt-4 dark:border-neutral-700"
        userName={post.githubId}
        profileImage={post.profileImage}
      />
      <div>prev & next Navigation</div>
      <div>comment</div>
    </div>
  );
};

export default PostPage;
