import type { OtpVerifyData } from "@/features/customers/auth/schemas/otpVerifySchema";
import client from "@/lib/api/client";

export const verifyCustomerSession = () => {
  return client.get("/api/v1/customers/two_factor");
};

export const verifyCustomerOtp = (data: OtpVerifyData) => {
  return client.patch("/api/v1/customers/two_factor/verify_otp", {
    otp: data.otp,
  });
};
