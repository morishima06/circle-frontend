import { z } from "zod";

export const productSellSchema = z
  .object({
    name: z.string().min(1, "商品名を入力してください"),

    description: z.string().min(1, "商品説明を入力してください"),
    styleCode: z.string(),

    categoryId: z
      .string()
      .min(1, "カテゴリーを選択してください")
      .regex(/^\d+$/, "カテゴリーを選択してください")
      .transform(Number)
      .pipe(z.number().int().positive("カテゴリーを選択してください")),

    designerId: z
      .string()
      .min(1, "デザイナーを選択してください")
      .regex(/^\d+$/, "デザイナーを選択してください")
      .transform(Number)
      .pipe(z.number().int().positive("デザイナーを選択してください")),

    colorId: z
      .string()
      .min(1, "カラーを選択してください")
      .regex(/^\d+$/, "カラーを選択してください")
      .transform(Number)
      .pipe(z.number().int().positive("カラーを選択してください")),

    price: z
      .string()
      .min(1, "通常価格を入力してください")
      .regex(/^\d+$/, "通常価格は整数で入力してください")
      .refine((value) => Number(value) > 0, {
        message: "通常価格は0より大きい値を入力してください",
      })
      .transform(Number)
      .pipe(
        z.number().int().positive("通常価格は0より大きい値を入力してください"),
      ),

    // 未入力 "" → null
    salePrice: z
      .string()
      .refine(
        (value) => value === "" || /^\d+$/.test(value),
        "セール価格は整数で入力してください",
      )
      .refine(
        (value) => value === "" || Number(value) > 0,
        "セール価格は0より大きい値を入力してください",
      )
      .transform((value) => {
        if (value === "") {
          return null;
        }

        return Number(value);
      })
      .pipe(
        z
          .number()
          .int("セール価格は整数で入力してください")
          .positive("セール価格は0より大きい値を入力してください")
          .nullable(),
      ),

    status: z.string(),

    images: z.array(z.any()).min(1, "商品画像を1枚以上登録してください"),

    skus: z.array(
      z.object({
        id: z.number().optional(),

        sizeId: z
          .string()
          .min(1, "サイズを選択してください")
          .regex(/^\d+$/, "サイズを選択してください")
          .transform(Number)
          .pipe(z.number().int().positive("サイズを選択してください")),

        stock: z
          .string()
          .min(1, "在庫数を入力してください")
          .regex(/^\d+$/, "在庫数は整数で入力してください")
          .transform(Number)
          .pipe(
            z
              .number()
              .int("在庫数は整数で入力してください")
              .nonnegative("在庫数は0以上で入力してください"),
          ),
      }),
    ),

    specs: z.array(
      z.object({
        id: z.number().optional(),
        key: z.string(),
        value: z.string(),
      }),
    ),

    onSale: z.boolean(),

    // 未入力 "" → null
    saleStartAt: z
      .string()
      .transform((value) => {
        return value === "" ? null : value;
      })
      .pipe(z.string().nullable()),

    // 未入力 "" → null
    saleEndAt: z
      .string()
      .transform((value) => {
        return value === "" ? null : value;
      })
      .pipe(z.string().nullable()),
  })
  .superRefine((data, ctx) => {
    if (!data.onSale) {
      return;
    }

    if (data.salePrice === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["salePrice"],
        message: "セール価格を入力してください",
      });
    }

    if (data.saleStartAt === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["saleStartAt"],
        message: "セール開始日時を入力してください",
      });
    }

    if (data.saleEndAt === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["saleEndAt"],
        message: "セール終了日時を入力してください",
      });
    }

    if (data.saleStartAt && data.saleEndAt) {
      if (new Date(data.saleStartAt) >= new Date(data.saleEndAt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["saleEndAt"],
          message: "セール終了日時は開始日時より後にしてください",
        });
      }
    }
  });

/**
 * RHFで扱うフォーム入力値
 *
 * categoryId: string
 * designerId: string
 * colorId: string
 * price: string
 * salePrice: string
 * sizeId: string
 * stock: string
 * saleStartAt: string
 * saleEndAt: string
 */
export type ProductSellFormInput = z.input<typeof productSellSchema>;

/**
 * Zodで変換・バリデーションされた後の値
 *
 * categoryId: number
 * designerId: number
 * colorId: number
 * price: number
 * salePrice: number | null
 * sizeId: number
 * stock: number
 * saleStartAt: string | null
 * saleEndAt: string | null
 */
export type ProductSellData = z.output<typeof productSellSchema>;
