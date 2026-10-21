import type { ProfileData } from "@/features/favorite/schemas/profileSchema";
import client from "@/lib/api/client";

type ProfileUpdateParams = {
  customer: ProfileData;
};

export const profileUpdate = (data: ProfileUpdateParams) => {
  return client.patch("/customers/profile", data);
};
