import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test.describe("Tic Tac Toe Game Sanity Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "should have the correct page title",
    { tag: "@sanity" },
    async ({ page }) => {
      await expect(page).toHaveTitle("Tic-Tac-Toe");
    }
  );

  test(
    "renders the next player header",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.nextPlayerHeader).toBeVisible();
    }
  );

  test("renders the history header", { tag: "@sanity" }, async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.historyHeader).toBeVisible();
  });

  test(
    "renders the go to game start button",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.goToGameStartBtn).toBeVisible();
    }
  );

  test(
    "renders the go to reset button",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.resetBtn).toBeVisible();
    }
  );

  test("renders the game board", { tag: "@sanity" }, async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.squares).toHaveCount(9);
  });
});
