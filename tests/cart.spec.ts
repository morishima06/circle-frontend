import { test, expect } from "@playwright/test";

test.describe("Guest Cart", () => {
  test("商品をカートに追加できる", async ({ page }) => {
    // 商品一覧
    await page.goto("/men");

    // 商品詳細へ
    await page.getByTestId("product-link").first().click();

    // 在庫ありサイズを選択
    await page
      .locator('button[data-testid="size-option"]:not([disabled])')
      .first()
      .click();

    // カートに追加
    await page.getByRole("button", { name: "カートに入れる" }).click();

    // カートへ
    await page.getByTestId("cart-link").click();

    // カートの合計数量が1であることを確認
    await expect(page.getByTestId("cart-item-count")).toHaveText("1");
  });

  test("カートの数量を変更できる", async ({ page }) => {
    // 商品一覧
    await page.goto("/men");

    // 商品詳細へ
    await page.getByTestId("product-link").first().click();

    // 在庫ありサイズを選択
    await page
      .locator('button[data-testid="size-option"]:not([disabled])')
      .first()
      .click();

    // カートに追加
    await page.getByRole("button", { name: "カートに入れる" }).click();

    // カートへ
    await page.getByTestId("cart-link").click();

    // カートの合計数量が1であることを確認
    await expect(page.getByTestId("cart-item-count")).toHaveText("1");

    // 数量を1 → 2
    await page.getByRole("button", { name: "数量を1増やす" }).click();

    // カートの合計数量が2になったことを確認
    await expect(page.getByTestId("cart-item-count")).toHaveText("2");

    // 数量を2 → 1
    await page.getByRole("button", { name: "数量を1減らす" }).click();

    // カートの合計数量が1になったことを確認
    await expect(page.getByTestId("cart-item-count")).toHaveText("1");
  });

  test("カートの商品を削除できる", async ({ page }) => {
    // 商品一覧
    await page.goto("/men");

    // 商品詳細へ
    await page.getByTestId("product-link").first().click();

    // 在庫ありサイズを選択
    await page
      .locator('button[data-testid="size-option"]:not([disabled])')
      .first()
      .click();

    // カートに追加
    await page.getByRole("button", { name: "カートに入れる" }).click();

    // カートへ
    await page.getByTestId("cart-link").click();

    // カートの合計数量が1であることを確認
    await expect(page.getByTestId("cart-item-count")).toHaveText("1");

    // 商品を削除
    await page.getByRole("button", { name: "カートから削除" }).click();

    // カートの合計数量が0であることを確認
    await expect(page.getByTestId("cart-item-count")).toBeHidden();
  });
});
