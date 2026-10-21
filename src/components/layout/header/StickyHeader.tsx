import { HeaderActions } from "./HeaderActions";
import { Logo } from "./Logo";
import NavMenu from "./NavMenu";

type Props = {
  isScrolled: boolean;
  openModal: () => void;
};

export const StickyHeader = ({ isScrolled, openModal }: Props) => {
  if (!isScrolled) return null;

  return (
    <div className="fixed top-0 left-0 z-50 flex w-full items-center border-b border-b-gray-200 bg-white py-3 pr-8 pl-4">
      <div className="flex justify-center pr-2 text-[20px] font-medium tracking-wider">
        <Logo />
      </div>

      <NavMenu className="ml-3" />

      <div className="ml-auto">
        <HeaderActions openModal={openModal} />
      </div>
    </div>
  );
};
