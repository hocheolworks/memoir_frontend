import { RefObject, useEffect } from "react";

export default function useObserver(
  ref: RefObject<HTMLElement> | null,
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
  }, [ref]);
}
