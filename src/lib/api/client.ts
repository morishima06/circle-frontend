// client.js
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import Router from "next/router";

const logError = (error: unknown): void => {
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }
};
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:5001/api/v1",
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  }),
  options,
);

const getCsrfToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("CSRF-TOKEN="))
    ?.split("=")[1];

  return token ? decodeURIComponent(token) : undefined;
};

client.interceptors.request.use((config) => {
  if (["post", "patch", "put", "delete"].includes(config.method ?? "")) {
    const token = getCsrfToken();
    config.headers.set("X-CSRF-Token", token);
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data?.error;

    logError(error);
    if (status === 401) {
      Router.push("/login");
    }

    return Promise.reject({
      status,
      code: data?.code ?? "UNKNOWN_ERROR",
      message: data?.message ?? "エラーが発生しました",
      ...(data?.fields && { fields: data.fields }),
    });
  },
);
export default client;
