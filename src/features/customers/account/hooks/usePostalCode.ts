import { fetchPostalCode } from "@/api/external/postalCode";

export const usePostalCode = () => {
  const fetchAddressByPostalCode = async (postalCode: string) => {
    const data = await fetchPostalCode(postalCode);
    if (!data.results) throw new Error("住所が見つかりませんでした");
    return data.results[0];
  };

  return { fetchAddressByPostalCode };
};
