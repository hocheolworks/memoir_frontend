import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { selectAuthState, selectAuthUser } from "@redux/modules/authSlice";

const Home: NextPage = () => {
  const isLoggedIn = useSelector(selectAuthState);
  const user = useSelector(selectAuthUser);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* <PostContainer className="mt-28"></PostContainer> */}
      <p className="mb-24 text-5xl font-bold">대충 개쩌는 슬로건.</p>
    </div>
  );
};

export default Home;
