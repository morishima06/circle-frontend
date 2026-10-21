import client from "@/lib/api/client";

export const getCurrentAdmin = () => {
  return client.get("/current_admin");
};
