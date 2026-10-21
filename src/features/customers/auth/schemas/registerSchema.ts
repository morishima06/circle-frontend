// src/lib/validation/schemas/registerSchema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    lastName: z.string().min(1, "姓を入力してください"),
    firstName: z.string().min(1, "名を入力してください"),
    lastNameKana: z.string().min(1, "フリガナ(セイ)を入力してください"),
    firstNameKana: z.string().min(1, "フリガナ(メイ)を入力してください"),
    email: z
      .string()
      .min(1, "メールアドレスを入力してください")
      .email("正しいメールアドレスを入力してください"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(/^[a-zA-Z0-9]+$/, "半角英数字で入力してください"),
    passwordConfirmation: z.string().min(1, "パスワード確認を入力してください"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
