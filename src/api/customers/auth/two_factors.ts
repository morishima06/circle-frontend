import type { OtpVerifyData } from "@/features/customers/auth/schemas/otpVerifySchema";
import client from "@/lib/api/client";

export const verifyCustomerSession = () => {
  return client.get("/customers/two_factor");
};

export const verifyCustomerOtp = (data: OtpVerifyData) => {
  return client.patch("/customers/two_factor/verify_otp", {
    otp: data.otp,
  });
};
