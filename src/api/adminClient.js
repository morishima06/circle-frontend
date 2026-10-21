// api/adminClient.js
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true,
};

const adminClient = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:5001/admin/api/v1",
    withCredentials: true,
    headers: {
      Accept: "application/json", // ここを追加
    },
  }),
  options,
);

export default adminClient;
