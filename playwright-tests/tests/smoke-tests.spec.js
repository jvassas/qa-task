import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { GameUtils } from "../utility/gameUtils";

test.describe("Tic Tac Toe Game Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "Verify a player can make a move",
    { tag: "@smoke" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSquare(0);
      await expect(homePage.squares.nth(0)).toHaveText("X");
    }
  );

  test(
    "Verify a player can click all squares",
    { tag: "@smoke" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.clickAllSquaresWithReset();
    }
  );

  test(
    "Verify the game alternates turns between player X and player O",
    { tag: "@smoke" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSquare(0);
      await homePage.clickSquare(1);
      await expect(homePage.squares.nth(0)).toHaveText("X");
      await expect(homePage.squares.nth(1)).toHaveText("O");
    }
  );

  test(
    "Verify game detects a winning combination",
    { tag: "@smoke" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.playWinningGame("X");
      await expect(homePage.winnerMessage).toHaveText(/Winner: X/);
    }
  );

  test(
    "Verify history updates after a move",
    { tag: "@smoke" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSquare(0);
      await expect(homePage.historyItems).toHaveCount(1);
    }
  );

  test(
    "Verify history updates after multiple moves",
    { tag: "@smoke" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.clickMultipleSquaresNoWinner(5);
      await expect(homePage.historyItems).toHaveCount(5);
    }
  );

  test(
    "Verify navigation to a previous move works",
    { tag: "@smoke" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.nextPlayerHeader).toHaveText(/Next player: X/);
      await homePage.clickSquare(0);
      await homePage.clickSquare(1);
      await homePage.clickSquare(2);
      await homePage.historyItems.nth(0).click();
      await expect(homePage.squares).toHaveText([
        "X",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
    }
  );
});
