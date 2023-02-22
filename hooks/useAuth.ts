import { useDispatch } from "react-redux";
import { resetAuth, setAuthUser } from "../redux/modules/authSlice";
import { resetToken, setGithubToken } from "../token";
import { User } from "../utils/types";

export function useAuth() {
  const dispatch = useDispatch();

  const login = (user: User) => {
    // TODO: 로그인 훅 완성하기
    dispatch(setAuthUser(user));
    setGithubToken(user.githubAccessToken);
  };

  const logout = () => {
    dispatch(resetAuth());
    resetToken();
  };

  return { login, logout };
}
