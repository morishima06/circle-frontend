// src/lib/validation/schemas/checkoutAddressSchema.ts
import { z } from "zod";

export const checkoutAddressSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),

  lastName: z.string().min(1, "姓を入力してください"),

  firstName: z.string().min(1, "名を入力してください"),

  postalCode: z
    .string()
    .min(1, "郵便番号を入力してください")
    .regex(/^\d{3}-?\d{4}$/, "郵便番号の形式が正しくありません"),

  prefecture: z.string().min(1, "都道府県を選択してください"),

  city: z.string().min(1, "市区町村を入力してください"),

  addressLine1: z.string().min(1, "住所1を入力してください"),

  addressLine2: z.string().optional(),

  phoneNumber: z
    .string()
    .min(1, "電話番号を入力してください")
    .regex(/^0\d{9,10}$/, "電話番号の形式が正しくありません"),
});

export type CheckoutAddressData = z.infer<typeof checkoutAddressSchema>;
