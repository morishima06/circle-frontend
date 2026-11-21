import Head from "next/head";
import type { ReactNode } from "react";

import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { CategoryGrid } from "@/features/Home/components/CategoryGrid";
import { DesignerList } from "@/features/Home/components/DesignerList";

const Home = () => {
  return (
    <>
      <Head>
        <title>CIRCLE | デザイナーズファッション通販</title>
        <meta
          name="description"
          content="国内外のデザイナーズブランドを取り扱うオンラインストア。新着商品や人気ブランドを掲載しています。"
        />
      </Head>
      <div className="px-12">
        <img
          src="https://circle-assets-208931561898-ap-northeast-1-an.s3.ap-northeast-1.amazonaws.com/products/acne_c90210_969_3.png"
          alt="商品画像"
        />
        <CategoryGrid />
        <DesignerList />
      </div>
    </>
  );
};

Home.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default Home;
