import { request } from "@playwright/test";

export const createTestCustomer = async () => {
  const email = `e2e-${crypto.randomUUID()}@example.com`;
  const password = "password123";

  const api = await request.newContext();

  try {
    // CSRF-TOKENを取得
    const csrfResponse = await api.get(
      "http://localhost:5001/api/v1/current_customer",
    );

    if (!csrfResponse.ok()) {
      throw new Error(
        `CSRF取得失敗: ${csrfResponse.status()} ${await csrfResponse.text()}`,
      );
    }

    const storageState = await api.storageState();

    const csrfToken = storageState.cookies.find(
      (cookie) => cookie.name === "CSRF-TOKEN",
    )?.value;

    if (!csrfToken) {
      throw new Error("CSRF-TOKEN が取得できませんでした");
    }

    // Customer作成
    const response = await api.post(
      "http://localhost:5001/api/v1/customers/register",
      {
        headers: {
          "X-CSRF-Token": decodeURIComponent(csrfToken),
        },
        data: {
          customer: {
            first_name: "山田",
            las_name: "太郎",
            first_name_kana: "ヤマダ",
            last_name_kana: "タロウ",
            email,
            password,
            password_confirmation: password,
          },
        },
      },
    );

    if (!response.ok()) {
      throw new Error(
        `Customer作成失敗: ${response.status()} ${await response.text()}`,
      );
    }

    return {
      email,
      password,
    };
  } finally {
    await api.dispose();
  }
};
