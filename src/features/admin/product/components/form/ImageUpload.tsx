import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { type ProductSellData } from "@/features/admin/product/schemas/productSellSchema";
import client from "@/lib/api/client";
import type { ProductFormImage } from "@/types/admin/product";

import { SortableImage } from "./SortableImage";

type Props = {
  initialImages?: ProductFormImage[];
};

export const ImageUpload = ({ initialImages }: Props) => {
  const { setValue } = useFormContext<ProductSellData>();

  const [images, setImages] = useState<ProductFormImage[]>([]);

  useEffect(() => {
    setImages(initialImages ?? []);
  }, [initialImages]);

  /*
   * フォームのimagesを更新
   */
  const updateFormImages = (updated: ProductFormImage[]) => {
    setValue(
      "images",
      updated.map((img) =>
        img.id !== undefined ? { id: img.id } : { signedId: img.signedId! },
      ),
      {
        shouldDirty: true,
      },
    );
  };

  /*
   * 画像アップロード
   */
  const handleUpload = async (files: File[]) => {
    const uploadedImages: ProductFormImage[] = [];

    for (const file of files) {
      const formData = new FormData();

      formData.append("image[file]", file);

      try {
        const res = await client.post("/admin/product_images", formData);

        uploadedImages.push({
          signedId: res.data.signedId,
          url: res.data.url,
        });
      } catch (error) {
        console.error("アップロード失敗:", error);
      }
    }

    if (uploadedImages.length === 0) {
      return;
    }

    setImages((prev) => {
      const updated = [...prev, ...uploadedImages];

      updateFormImages(updated);

      return updated;
    });
  };

  /*
   * react-dropzone
   *
   * ファイル選択・ファイルDropを担当
   */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop: handleUpload,
  });

  /*
   * 画像削除
   */
  const handleRemove = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      updateFormImages(updated);

      return updated;
    });
  };

  /*
   * dnd-kit用ID
   */
  const getImageId = (image: ProductFormImage) => {
    return image.id ?? image.signedId!;
  };

  /*
   * 画像並び替え
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setImages((prev) => {
      const oldIndex = prev.findIndex(
        (image) => getImageId(image) === active.id,
      );

      const newIndex = prev.findIndex((image) => getImageId(image) === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return prev;
      }

      const updated = arrayMove(prev, oldIndex, newIndex);

      updateFormImages(updated);

      return updated;
    });
  };

  return (
    <div>
      <div className="my-6 text-base font-semibold text-gray-700">商品画像</div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map(getImageId)}
          strategy={rectSortingStrategy}
        >
          {/* 画像アップローダー全体の枠 */}
          <div
            className={`rounded-lg border bg-white p-6 transition ${isDragActive ? "border-black bg-gray-100" : "border-gray-300"} `}
          >
            {/* 画像グリッド */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <SortableImage
                  key={getImageId(image)}
                  image={image}
                  onRemove={() => handleRemove(index)}
                />
              ))}

              {/* 画像追加 */}
              <div
                {...getRootProps()}
                className="flex h-28 cursor-pointer items-center justify-center rounded border hover:bg-gray-100"
              >
                <input {...getInputProps()} />

                <span className="text-sm text-gray-500">＋画像を追加</span>
              </div>
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
