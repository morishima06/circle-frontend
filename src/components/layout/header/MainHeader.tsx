import { NormalHeader } from "./NormalHeader";
import { StickyHeader } from "./StickyHeader";

type Props = {
  isScrolled: boolean;
  mainHeaderRef: React.RefObject<HTMLDivElement>;
  openModal: () => void;
};

export const MainHeader = ({ isScrolled, mainHeaderRef, openModal }: Props) => {
  return (
    <div
      ref={mainHeaderRef}
      className="relative z-10 flex flex-col items-center pt-4 pb-4"
    >
      <NormalHeader openModal={openModal} />

      {isScrolled && (
        <StickyHeader isScrolled={isScrolled} openModal={openModal} />
      )}
    </div>
  );
};
