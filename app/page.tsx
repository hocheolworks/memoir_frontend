import { errorHandler } from "@api/error";
import PostAPI from "@api/post/postAPI";
import PostContainer from "@components/PostContainer";
import { PreviewToBe } from "@utils/types";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEB_URL ?? "https://www.mem0ir.com"
  ),
  title: "MEMOIR.",
  description: "블로그와 잔디심기를 한번에? 당신의 개발을 회고해보세요!",
  icons: "/favicon-light.ico",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/og/og-memoir.png" }],
    url: "/",
    siteName: "MEMOIR.",
    description: "블로그와 잔디심기를 한번에? 당신의 개발을 회고해보세요!",
  },
};

async function getHottestPosts(page: number, pageSize: number) {
  let posts: PreviewToBe[] = [];

  try {
    const { data } = await PostAPI.getHottestPosts(page, pageSize, true);
    posts = data.list;
  } catch (e: any) {
    console.log("/index Error");
    console.log(e);
    errorHandler(e);
  }

  return {
    posts: posts,
  };
}

const Home = async () => {
  const { posts } = await getHottestPosts(1, 32);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="w-full pb-6 pt-12 text-left">
        <h2 className="text-2xl font-bold">On Fire 🔥</h2>
      </div>
      <div className="w-full">
        <PostContainer posts={posts} />
      </div>
    </div>
  );
};

export default Home;
