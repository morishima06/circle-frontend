// src/lib/validation/schemas/profileSchema.ts
import { z } from "zod";

export const profileSchema = z.object({
  last_name: z.string().min(1, "姓を入力してください"),
  first_name: z.string().min(1, "名を入力してください"),
  last_name_kana: z.string().min(1, "フリガナ(セイ)を入力してください"),
  first_name_kana: z.string().min(1, "フリガナ(メイ)を入力してください"),
  phone_number: z.string().min(1, "電話番号を入力してください"),
  birth_date: z.string().min(1, "生年月日を入力してください"),
  gender: z.string().min(1, "性別を入力してください"),
});

export type ProfileData = z.infer<typeof profileSchema>;
