import { GetServerSideProps } from "next";
import { ReactNode } from "react";

import { getProduct } from "@/api/product";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { ImageGroup } from "@/features/product/components/ImageGroup";
import { ProductInfo } from "@/features/product/components/ProductInfo";
import type { ProductDetail } from "@/types/product";

type Props = {
  product: ProductDetail;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { gender, designer, styleCode } = context.params as {
    gender: string;
    designer: string;
    styleCode: string;
  };

  try {
    const product = await getProduct(gender, designer, styleCode);

    return {
      props: { product },
    };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      error.status === 404
    ) {
      return {
        notFound: true,
      };
    }

    throw error;
  }
};

const ProductPage = ({ product }: Props) => {
  console.log(product);

  return (
    <div className="mt-12 grid grid-cols-[1fr_380px] gap-8 px-8">
      <ImageGroup product={product} />

      <ProductInfo product={product} />
    </div>
  );
};

ProductPage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default ProductPage;
