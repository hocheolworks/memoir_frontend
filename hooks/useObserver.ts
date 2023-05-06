import { MutableRefObject, useEffect } from "react";

export default function useObserver(
  ref: MutableRefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    if (!ref || !ref.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, ref.current]);
}
