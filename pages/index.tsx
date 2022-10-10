import type { NextPage } from "next";
import PostContainer from "../components/PostContainer";

const Home: NextPage = () => {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <PostContainer></PostContainer>
    </main>
  );
};

export default Home;
