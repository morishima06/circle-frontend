import Link from "next/link";

import type { DesignersData } from "@/types/designer";

type Props = {
  designersByInitial: DesignersData;
};

export const DesignerList = ({ designersByInitial }: Props) => {
  return (
    <div className="w-full max-w-6xl space-y-2">
      {Object.entries(designersByInitial)
        .filter(([, designers]) => designers.length > 0)
        .map(([key, designers]) => {
          const label = key === "others" ? "#" : key.toUpperCase();

          return (
            <div
              id={key}
              key={key}
              className="scroll-mt-[60px] border-b border-slate-400 pb-3 text-xs last:border-none"
            >
              <h2 className="pt-1 pb-3 font-bold">{label}</h2>

              <ul className="mr-2 flex flex-wrap">
                {designers.map((designer) => (
                  <li className="w-1/2" key={designer.id}>
                    <Link href={`/men/designers/${designer.slug}`}>
                      {designer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
    </div>
  );
};
