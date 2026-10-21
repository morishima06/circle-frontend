import type { RefObject } from "react";
import { useEffect, useState } from "react";

export const useHeaderScroll = (
  mainHeaderRef: RefObject<HTMLElement | null>,
) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const target = mainHeaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [mainHeaderRef]);

  return isScrolled;
};
