import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState, setAuthState } from "../redux/store/authSlice";

const Home: NextPage = () => {
  return (
    <main className="h-full w-full flex items-center justify-center">
      <div>HOME</div>
    </main>
  );
};

export default Home;
