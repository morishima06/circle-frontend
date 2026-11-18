import type { ProfileData } from "@/features/favorite/schemas/profileSchema";
import client from "@/lib/api/client";

type ProfileUpdateParams = {
  customer: ProfileData;
};

export const profileUpdate = (data: ProfileUpdateParams) => {
  return client.patch("/api/v1/customers/profile", data);
};
