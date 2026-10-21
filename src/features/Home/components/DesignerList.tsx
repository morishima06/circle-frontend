import Link from "next/link";

type Designer = {
  name: string;
  slug: string;
};

const designers: Designer[] = [
  { name: "1017 ALYX 9SM", slug: "1017-alyx-9sm" },
  { name: "ACNE STUDIOS", slug: "acne-studios" },
  { name: "ADER error", slug: "ader-error" },
  { name: "A-COLD-WALL*", slug: "a-cold-wall" },
  { name: "A.P.C", slug: "apc" },
  { name: "AND WANDER", slug: "and-wander" },
  { name: "ASICS", slug: "asics" },
  { name: "BALENCIAGA", slug: "balenciaga" },
  { name: "C.P COMPANY", slug: "cp-company" },
  { name: "EDWIN", slug: "edwin" },
  { name: "FEAR OF GOD", slug: "fear-of-god" },
  { name: "GRAMICCI", slug: "gramicci" },
  { name: "Kenzo", slug: "kenzo" },
  { name: "JW Anderson", slug: "jw-anderson" },
  { name: "Lacoste", slug: "lacoste" },
  { name: "NIKE", slug: "nike" },
  { name: "nanamica", slug: "nanamica" },
  { name: "NORSE PROJECTS", slug: "norse-projects" },
  { name: "OAMC", slug: "oamc" },
  { name: "POLO RALPH LAUREN", slug: "polo-ralph-lauren" },
  { name: "Palm Angels", slug: "palm-angels" },
  { name: "Saturdays NYC", slug: "saturdays-nyc" },
  { name: "Stone Island", slug: "stone-island" },
  { name: "PORTER YOSHIDA", slug: "porter-yoshida" },
  { name: "UNDER COVER", slug: "undercover" },
  { name: "VANS", slug: "vans" },
  { name: "WOOD WOOD", slug: "wood-wood" },
  { name: "Y-3", slug: "y-3" },
];

export const DesignerList = () => {
  return (
    <div className="mt-6 mb-10 border-x-0 border-t border-gray-700 pt-8 pb-14 text-black">
      <h1 className="mb-8 text-center text-xl font-medium tracking-wide">
        DESIGNER
      </h1>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold">
        {designers.map((designer) => (
          <Link key={designer.slug} href={`/men/designers/${designer.slug}`}>
            {designer.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
