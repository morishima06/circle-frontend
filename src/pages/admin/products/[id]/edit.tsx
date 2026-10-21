import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { ProductDetail } from "@//types/admin/product";
import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import { Button } from "@/components/ui/Button";
import { ProductSellForm } from "@/features/admin/product/components/ProductSellForm";
import {
  type ProductSellData,
  type ProductSellFormInput,
  productSellSchema,
} from "@/features/admin/product/schemas/productSellSchema";
import client from "@/lib/api/client";
import { handleFormError } from "@/lib/errors/handleFormError";

const AdminProductEditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductDetail | null>(null);
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
      specs: [
        {
          key: "",
          value: "",
        },
      ],
      skus: [
        {
          sizeId: "",
          stock: "",
        },
      ],
      onSale: false,
      saleStartAt: "",
      saleEndAt: "",
    },
  });

  const { reset, setError } = form;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await client.get(`/admin/products/${id}`);

        console.log(res);
        const product: ProductDetail = res.data.product;

        const formatDateTime = (dateStr: string | null) => {
          if (!dateStr) {
            return "";
          }

          return dateStr.slice(0, 16);
        };

        reset({
          name: product.name,
          description: product.description,
          categoryId: String(product.categoryId),
          designerId: String(product.designerId),
          colorId: String(product.colorId),
          price: String(product.price),
          salePrice:
            product.salePrice === null ? "" : String(product.salePrice),
          status: product.status,
          images: product.images.map((img) => ({
            id: img.id,
            url: img.url,
          })),
          specs:
            product.specs.length > 0
              ? product.specs.map((spec) => ({
                  id: spec.id,
                  key: spec.key,
                  value: spec.value,
                }))
              : [
                  {
                    key: "",
                    value: "",
                  },
                ],
          skus: product.skus.map((sku) => ({
            id: sku.id,
            sizeId: String(sku.sizeId),
            stock: String(sku.stock),
          })),
          onSale: product.salePrice !== null,
          saleStartAt: formatDateTime(product.saleStartAt),
          saleEndAt: formatDateTime(product.saleEndAt),
        });

        setProduct(product);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data: ProductSellData) => {
    console.log("送信DATA", data);
    try {
      const { skus, specs, ...productData } = data;

      const request = {
        ...productData,

        skusAttributes: skus.map((sku) => ({
          id: sku.id,
          sizeId: sku.sizeId,
          stock: sku.stock,
        })),

        specsAttributes: specs.map((spec) => ({
          id: spec.id,
          key: spec.key,
          value: spec.value,
        })),
      };

      console.log("更新API送信データ:", request);

      await client.patch(`/admin/products/${id}/edit`, {
        product: request,
      });

      alert("更新しました");
    } catch (err) {
      handleFormError(err, setError);
    }
  };

  console.log(product);

  if (!product) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl pt-8 pb-20">
      <h1 className="mb-6 w-full text-center text-xl font-semibold">
        商品の編集
      </h1>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("バリデーションエラー:", errors);
          })}
        >
          <ProductSellForm
            initialDesignerName={product.designerName}
            initialImages={product.images}
            initialCategoryId={product.categoryId}
          />

          <div className="mt-12 text-center">
            <Button type="submit" className="px-28 py-5">
              更新する
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

AdminProductEditPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminProductEditPage;
