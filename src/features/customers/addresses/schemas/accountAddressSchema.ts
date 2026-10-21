// lib/validation/schemas/accountAddressSchema.ts
import { z } from "zod";

export const accountAddressSchema = z.object({
  lastName: z.string().min(1, "姓を入力してください"),
  firstName: z.string().min(1, "名を入力してください"),
  lastNameKana: z.string().min(1, "フリガナ(セイ)を入力してください"),
  firstNameKana: z.string().min(1, "フリガナ(メイ)を入力してください"),
  postalCode: z
    .string()
    .regex(/^\d{7}$/, "郵便番号は7桁の数字で入力してください"),
  prefecture: z.string().min(1, "都道府県を選択してください"),
  city: z.string().min(1, "市区町村を入力してください"),
  addressLine1: z.string().min(1, "番地を入力してください"),
  addressLine2: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, "電話番号は10〜11桁の数字で入力してください"),
  isDefault: z.boolean().optional(),
});

export type AccountAddressData = z.infer<typeof accountAddressSchema>;
