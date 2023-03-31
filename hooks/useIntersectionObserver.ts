import { useCallback, useEffect, useRef } from "react";

// 만들다 보니, 사용안할거 같네..
function useIntersectionObserver(option?: IntersectionObserverInit) {
  const dom = useRef();

  const handleScroll = useCallback<IntersectionObserverCallback>(
    (entries, observer) => {
      const { current } = dom;
      console.log(entries);
      console.log(observer);
    },
    []
  );

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, option);
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
  };
}

export default useIntersectionObserver;
