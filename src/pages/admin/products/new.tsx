import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import { Button } from "@/components/ui/Button";
import { ProductSellForm } from "@/features/admin/product/components/ProductSellForm";
import {
  ProductSellData,
  ProductSellFormInput,
  productSellSchema,
} from "@/features/admin/product/schemas/productSellSchema";
import client from "@/lib/api/client";

const AdminProductNewPage = () => {
  const form = useForm<ProductSellFormInput, unknown, ProductSellData>({
    resolver: zodResolver(productSellSchema),

    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      designerId: "",
      colorId: "",
      price: "",
      salePrice: "",
      status: "",
      images: [],
      skus: [
        {
          sizeId: "",
          stock: "",
        },
      ],
      specs: [
        {
          key: "",
          value: "",
        },
      ],
      onSale: false,
      saleStartAt: "",
      saleEndAt: "",
    },
  });

  const onSubmit = async (data: ProductSellData) => {
    console.log("Zod変換後のフォームデータ:", data);

    const { skus, specs, ...productData } = data;

    const request = {
      ...productData,
      skusAttributes: skus,
      specsAttributes: specs,
    };

    console.log("API送信データ:", request);

    try {
      await client.post("/admin/products", {
        product: request,
      });

      alert("出品完了");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl pt-8 pb-20">
      <h1 className="mb-6 w-full text-center text-xl font-semibold">
        商品の出品
      </h1>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("バリデーションエラー:", errors);
          })}
        >
          <ProductSellForm />

          <div className="mt-12 text-center">
            <Button type="submit" className="px-28 py-5">
              出品する
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

AdminProductNewPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminProductNewPage;
