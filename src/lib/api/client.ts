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
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001",
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  }),
  options,
);

// CSRFトークンをCookieから取得
const getCsrfToken = (): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("CSRF-TOKEN="));

  if (!cookie) {
    return undefined;
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="));
};

// リクエストInterceptor
// リクエストInterceptor
client.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  console.log("[CSRF] Interceptor executed");
  console.log("[CSRF] Method:", method);

  if (["post", "patch", "put", "delete"].includes(method ?? "")) {
    const token = getCsrfToken();

    console.log("[CSRF] Cookie token exists:", !!token);

    if (token) {
      config.headers.set("X-CSRF-Token", token);
      console.log("[CSRF] Header set:", config.headers.has("X-CSRF-Token"));
    } else {
      console.warn("[CSRF] Cookie token not found");
    }
  }

  return config;
});

// レスポンスInterceptor
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
