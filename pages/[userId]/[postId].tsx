import React from "react";
import { NextPage } from "next";
import { NextPageContext } from "next/types";
import PostAPI from "../../api/post/postAPI";
import { dummyPost } from "../../utils/dummy";
import { Post } from "../../utils/types";
import Tag from "../../components/Tag";
import MarkdownPreview from "@uiw/react-markdown-preview";

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
    <div className="flex flex-col items-center">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <p>
          {githubId} · {createDate}
        </p>
      </div>
      <div className="flex">
        {post.tagList?.map((value, index) => (
          <Tag onClick={() => {}} key={`tag#${index}`}>
            {value}
          </Tag>
        ))}
      </div>
      <div>content</div>
      <div>series?</div>
      <div>authorInfo</div>
      <div>prev & next Navigation</div>
      <div>comment</div>
    </div>
  );
};

export default PostPage;
