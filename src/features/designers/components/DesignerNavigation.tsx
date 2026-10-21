import Link from "next/link";

import { DesignersData, Initial } from "@/types/designer";

type Props = {
  initials: Initial[];
  designersByInitial: DesignersData;
};

export const DesignerNavigation = ({ initials, designersByInitial }: Props) => {
  return (
    <ul className="mb-6 flex max-w-6xl flex-wrap gap-2">
      {initials.map(({ label, key }) => {
        const hasDesigners =
          designersByInitial[key] && designersByInitial[key].length > 0;

        return (
          <li key={key} className="flex h-7 w-7 items-center justify-center">
            {hasDesigners ? (
              <Link
                href={`#${key}`}
                className="flex h-full w-full items-center justify-center border border-slate-600 text-xs"
              >
                {label}
              </Link>
            ) : (
              <span className="flex h-full w-full cursor-default items-center justify-center border border-slate-400 text-xs text-slate-400">
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
