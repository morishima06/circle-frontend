import axios from "axios";

export const fetchPostalCode = async (postalCode: string) => {
  const res = await axios.get(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`,
  );

  return res.data;
};
