import { HeaderActions } from "./HeaderActions";
import { Logo } from "./Logo";
import NavMenu from "./NavMenu";

type Props = {
  openModal: () => void;
};

export const NormalHeader = ({ openModal }: Props) => {
  return (
    <>
      <div className="grid w-full grid-cols-3 items-center px-8">
        {/* 左側のスペーサー */}
        <div aria-hidden="true" />

        <div className="flex justify-center">
          <div className="text-[28px] font-medium tracking-wider">
            <Logo />
          </div>
        </div>

        <div className="flex justify-end">
          <HeaderActions openModal={openModal} />
        </div>
      </div>
      <div className="mt-3 flex w-full justify-center">
        <NavMenu />
      </div>
    </>
  );
};
