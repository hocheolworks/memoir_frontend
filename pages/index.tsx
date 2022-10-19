import type { NextPage } from "next";
import PostContainer from "../components/PostContainer";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PostContainer className="mt-28"></PostContainer>
    </div>
  );
};

export default Home;
