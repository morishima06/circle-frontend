import { test, expect } from "@playwright/test";
import { getOtpFromMailtrap } from "../e2e/helpers/mailtrap";
import { createTestCustomer } from "../e2e/helpers/createTestCustomer";

test("新規会員登録ができる", async ({ page }) => {
  await page.goto("/register");

  await page.getByLabel("姓").fill("森島");
  await page.getByLabel("名").fill("瞬也");
  await page.getByLabel("フリガナ(セイ)").fill("モリシマ");
  await page.getByLabel("フリガナ(メイ)").fill("シュンヤ");

  await page.getByLabel("メールアドレス").fill(`e2e-${Date.now()}@example.com`);

  await page.getByLabel("パスワード", { exact: true }).fill("Password123");

  await page.getByLabel("パスワード確認", { exact: true }).fill("Password123");

  await page.getByRole("button", { name: "アカウント作成" }).click();

  await expect(page).toHaveURL("/");
});

test("ログインできる", async ({ page }) => {
  // テスト専用ユーザーを作成
  const { email, password } = await createTestCustomer();
  const testStartedAt = new Date();

  await page.goto("/login");

  await page.waitForResponse(
    (response) =>
      response.url() === "http://localhost:5001/api/v1/current_customer" &&
      response.request().method() === "GET",
  );

  await page.getByLabel("メールアドレス").fill(email);
  await page.getByLabel("パスワード").fill(password);

  await page
    .getByRole("button", {
      name: "ログイン",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("/two-factor");

  const otp = await getOtpFromMailtrap(email, testStartedAt);

  await page.getByLabel("６桁認証コード").fill(otp);

  await page
    .getByRole("button", {
      name: "認証する",
    })
    .click();

  await expect(page).toHaveURL("/");
});

test("ログアウトできる", async ({ page }) => {
  // ログインテストとは別のユーザーを作成
  const { email, password } = await createTestCustomer();
  const testStartedAt = new Date();

  await page.goto("/login");

  await page.waitForResponse(
    (response) =>
      response.url() === "http://localhost:5001/api/v1/current_customer" &&
      response.request().method() === "GET",
  );

  await page.getByLabel("メールアドレス").fill(email);
  await page.getByLabel("パスワード").fill(password);

  await page
    .getByRole("button", {
      name: "ログイン",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("/two-factor");

  const otp = await getOtpFromMailtrap(email, testStartedAt);

  await page.getByLabel("６桁認証コード").fill(otp);

  await page
    .getByRole("button", {
      name: "認証する",
    })
    .click();

  await expect(page).toHaveURL("/");

  // アカウントメニューを開く
  await page.getByTestId("account-icon").hover();

  // ログアウト
  await page
    .getByRole("button", {
      name: "ログアウト",
    })
    .click();

  await expect(page).toHaveURL("/");
});
