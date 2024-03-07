import React from "react";
import { PostToBe } from "@utils/types";
import { formatAbsolute } from "@utils/functions";
import PostAPI from "@api/post/postAPI";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import PostClientPage from "./client-page";

async function getPost(postId: number) {
  try {
    const { statusCode, data } = await PostAPI.getPostById(postId);

    if (statusCode === 200) {
      return {
        post: JSON.parse(JSON.stringify(data)) as PostToBe,
      };
    } else {
      return {};
    }
  } catch (e) {
    console.log(e);
    return {};
  }
}

type Props = {
  params: { userId: string; postId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const postId = params.postId;
  const userId = params.userId;

  const { post } = await getPost(Number(postId));

  if (post) {
    return {
      title: post.postTitle,
      description: formatAbsolute(post.postBody),
      openGraph: {
        locale: "ko_KR",
        siteName: "MEMOIR.",
        title: post.postTitle,
        description: formatAbsolute(post.postBody),
        images: [
          {
            url:
              post.postThumbnailImageUrl ||
              "https://mem0ir.com/og/og-memoir.png",
          },
        ],
        url: `https://mem0ir.com/${userId}/${postId}`,
      },
    };
  } else {
    notFound();
  }
}

interface PageProps {
  params: {
    userId: string;
    postId: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const { post } = await getPost(Number(params.postId));

  if (post) {
    return <PostClientPage post={post} />;
  } else {
    notFound();
  }
}
