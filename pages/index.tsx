import { errorHandler } from "@api/error";
import PostAPI from "@api/post/postAPI";
import GlobalLayout from "@components/GlobalLayout";
import PostContainer from "@components/PostContainer";
import { PreviewToBe } from "@utils/types";
import { ReactElement, useCallback, useRef, useState } from "react";
import { NextPageWithLayout } from "./_app";
import useObserver from "@hooks/useObserver";

const PAGE_SIZE = 32;

let page = 2; // client

export async function getServerSideProps() {
  let posts: PreviewToBe[] = [];

  try {
    const { data } = await PostAPI.getHottestPosts(1, PAGE_SIZE);
    posts = data.list;
  } catch (e: any) {
    console.log("/index Error");
    console.log(e);
    errorHandler(e);
  }

  return {
    props: {
      posts: posts,
    },
  };
}

interface HomeProps {
  posts: PreviewToBe[];
}

const Home: NextPageWithLayout<HomeProps> = ({ posts }) => {
  const [postList, setPostList] = useState<PreviewToBe[]>(posts);
  const [isEnd, setIsEnd] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  useObserver(
    observerTarget,
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 1.0) {
          loadNextPosts(page);
          page++;
        }
      });
    },
    {
      root: null,
      threshold: 1.0,
    }
  );

  const loadNextPosts = useCallback((page: number) => {
    PostAPI.getHottestPosts(page, PAGE_SIZE)
      .then(({ data }) => {
        setPostList((prev) => [...prev, ...data.list]);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          setIsEnd(true);
        }
      });
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="w-full pb-6 pt-12 text-left">
        <h2 className="text-2xl font-bold">On Fire 🔥</h2>
      </div>
      <div className="w-full">
        <PostContainer posts={postList} />
        <div
          ref={observerTarget}
          className="h-16 w-full bg-transparent text-center text-2xl font-semibold"
        >
          {isEnd && "더이상 글이 없습니다?"}
        </div>
      </div>

      {/* <p className="mb-24 text-5xl font-bold">대충 개쩌는 슬로건.</p> */}
    </div>
  );
};

export default Home;
