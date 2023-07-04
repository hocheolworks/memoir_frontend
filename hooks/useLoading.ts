import {
  LoadingInfo,
  hideLoading,
  showLoading,
} from "@redux/modules/configSlice";
import { useDispatch } from "react-redux";

function useLoading() {
  const dispatch = useDispatch();

  const nowLoading = ({ type, text }: LoadingInfo) => {
    dispatch(showLoading({ type, text }));
  };

  const nowLoaded = () => {
    dispatch(hideLoading());
  };

  return {
    nowLoading,
    nowLoaded,
  };
}

export default useLoading;
