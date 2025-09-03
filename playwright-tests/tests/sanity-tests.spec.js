import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { GameUtils } from "../utility/gameUtils";

test.describe("Tic Tac Toe Game Sanity Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "Verify the page has the correct title",
    { tag: "@sanity" },
    async ({ page }) => {
      await expect(page).toHaveTitle("Tic-Tac-Toe");
    }
  );

  test(
    "Verify the next player header renders",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.nextPlayerHeader).toBeVisible();
    }
  );

  test(
    "Verify the history header renders",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.historyHeader).toBeVisible();
    }
  );

  test(
    "Verify the game start button renders",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.goToGameStartBtn).toBeVisible();
    }
  );

  test(
    "Verify the reset button renders",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.resetBtn).toBeVisible();
    }
  );

  test(
    "Verify the game board renders",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.squares).toHaveCount(9);
    }
  );

  test(
    "Verify the game board is empty on page load",
    { tag: "@sanity" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.expectBoardCleared();
    }
  );
});
