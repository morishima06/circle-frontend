import type { ReactNode } from "react";

type Props = {
  left: ReactNode;
  content: ReactNode;
  right: ReactNode;
};

export const CollectionLayout = ({ left, content, right }: Props) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-1 px-6 pb-6">
      <aside>{left}</aside> <div className="px-16">{content}</div>
      <aside>{right}</aside>
    </div>
  );
};
