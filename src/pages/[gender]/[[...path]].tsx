import type { GetServerSideProps } from "next";
import type { ReactNode } from "react";

import { getCollection } from "@/api/collections";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { CollectionContent } from "@/features/collections/components/CollectionContent";
import { CollectionLayout } from "@/features/collections/components/CollectionLayout";
import { FilterPanel } from "@/features/collections/components/FilterPanel";
import FilterSidebar from "@/features/collections/components/FilterSidebar";
import type { Collection, Pagination } from "@/types/collection";

type CollectionPageProps = Collection;

const EMPTY_PAGINATION: Pagination = {
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  perPage: 8,
};

const CollectionPage = ({
  products,
  heading,
  categories,
  designers,
  colors,
  pagination,
  error,
}: CollectionPageProps) => {
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="flex w-full justify-center gap-2 pb-12 pt-12 text-xl font-medium tracking-wider">
        &quot;{heading}&quot;
      </h1>

      <CollectionLayout
        left={<FilterSidebar categories={categories} designers={designers} />}
        content={
          <CollectionContent products={products} pagination={pagination} />
        }
        right={<FilterPanel colors={colors} />}
      />
    </div>
  );
};

CollectionPage.getLayout = (page: ReactNode) => (
  <StoreLayout>{page}</StoreLayout>
);

export default CollectionPage;

export const getServerSideProps: GetServerSideProps<
  CollectionPageProps
> = async ({ params, query }) => {
  const gender = params?.gender;
  const validGenders = ["men", "women"];

  if (typeof gender !== "string" || !validGenders.includes(gender)) {
    return { notFound: true };
  }

  const pathParam = params?.path;

  const pathArray: string[] =
    typeof pathParam === "string"
      ? [pathParam]
      : Array.isArray(pathParam)
        ? pathParam
        : [];

  const path = [gender, ...pathArray].join("/");

  const queryString = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (["gender", "path"].includes(key)) {
      return;
    }

    if (typeof value === "string") {
      queryString.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        queryString.append(key, item);
      });
    }
  });

  const search = queryString.toString();
  const url = search ? `/${path}?${search}` : `/${path}`;

  try {
    const data = await getCollection(url);

    return {
      props: {
        products: data.products ?? [],
        heading: data.heading ?? "",
        categories: data.categories ?? [],
        designers: data.designers ?? [],
        colors: data.colors ?? [],
        pagination: data.pagination ?? EMPTY_PAGINATION,
      },
    };
  } catch (error: unknown) {
    console.error("Collection SSR error", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch collection data";

    return {
      props: {
        products: [],
        heading: "",
        categories: [],
        designers: [],
        colors: [],
        pagination: EMPTY_PAGINATION,
        error: message,
      },
    };
  }
};
