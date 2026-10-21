// src/lib/validation/schemas/otpVerifySchema.ts
import { z } from "zod";

export const otpVerifySchema = z.object({
  otp: z
    .string()
    .min(1, "OTPを入力してください")
    .regex(/^\d{6}$/, "半角数字6桁で入力してください"), // 全角は弾く
});

export type OtpVerifyData = z.infer<typeof otpVerifySchema>;
