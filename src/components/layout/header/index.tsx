import { useRef } from "react";

import { useHeaderScroll } from "./hooks/useHeaderScroll";
import { useSearchModal } from "./hooks/useSearchModal";
import { MainHeader } from "./MainHeader";
import { SearchModal } from "./SearchModal";

export const Header = () => {
  const mainHeaderRef = useRef<HTMLDivElement>(null);

  const isScrolled = useHeaderScroll(mainHeaderRef);

  const { isFormVisible, inputRef, openModal, closeModal } = useSearchModal();

  return (
    <header>
      {isFormVisible && (
        <SearchModal inputRef={inputRef} closeModal={closeModal} />
      )}

      <MainHeader
        isScrolled={isScrolled}
        mainHeaderRef={mainHeaderRef}
        openModal={openModal}
      />
    </header>
  );
};
