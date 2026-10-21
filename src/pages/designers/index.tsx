import type { GetStaticProps } from "next";
import type { ReactNode } from "react";

import { fetchDesigners } from "@/api/designer";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { DesignerList } from "@/features/designers/components/DesignerList";
import { DesignerNavigation } from "@/features/designers/components/DesignerNavigation";
import type { DesignersData } from "@/types/designer";

type Props = {
  designersByInitial: DesignersData;
};

type Initial = {
  label: string;
  key: string;
};

const ALPHABETS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);

const INITIALS: Initial[] = [
  { label: "#", key: "others" },
  ...ALPHABETS.map((c) => ({
    label: c,
    key: c.toLowerCase(),
  })),
];

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const designersByInitial = await fetchDesigners();

    return {
      props: {
        designersByInitial,
      },
      revalidate: 60,
    };
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      err.status === 404
    ) {
      return {
        notFound: true,
      };
    }

    throw err;
  }
};

const DesignersPage = ({ designersByInitial }: Props) => {
  return (
    <div className="mt-12 flex items-center justify-center scroll-smooth px-2">
      {" "}
      <div className="max-w-6xl">
        {" "}
        <div className="mb-8 flex w-full max-w-6xl items-start">
          {" "}
          <h1 className="text-sm font-semibold">BRANDS</h1>{" "}
        </div>
        <DesignerNavigation
          initials={INITIALS}
          designersByInitial={designersByInitial}
        />
        <DesignerList designersByInitial={designersByInitial} />
      </div>
    </div>
  );
};

DesignersPage.getLayout = (page: ReactNode) => (
  <StoreLayout>{page}</StoreLayout>
);

export default DesignersPage;
