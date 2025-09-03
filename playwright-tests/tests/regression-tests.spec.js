import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { GameUtils } from "../utility/gameUtils";

test.describe("Tic Tac Toe Game Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "Verify a square cannot be played twice",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSquare(0);
      await homePage.clickSquare(0);
      await expect(homePage.squares.nth(0)).toHaveText("X");
    }
  );

  test(
    "Verify no other moves are allowed after a win",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.playWinningGame("X");
      await expect(homePage.winnerMessage).toContainText("Winner: X");
      await homePage.clickSquare(5);
      await expect(homePage.squares.nth(5)).toHaveText("");
    }
  );

  test(
    "Verify a winner does not display when a draw occurs",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.playDrawGame();
      await expect(homePage.winnerMessage).not.toBeVisible();
      await expect(homePage.nextPlayerHeader).toBeVisible();
    }
  );

  test(
    "Verify all winning scenarios are detected",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);

      const winScenarios = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // cols
        [0, 4, 8],
        [2, 4, 6], // diagonals
      ];

      for (const combo of winScenarios) {
        await page.goto("/");
        await gameUtils.playWinningCombo(combo, "X");
        await expect(homePage.winnerMessage).toContainText("Winner: X");
      }
    }
  );

  test(
    "Verify reset button clears the history",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.clickMultipleSquaresNoWinner();
      await homePage.resetBtn.click();
      await expect(homePage.historyItems).not.toBeVisible();
    }
  );

  test(
    "Verify reset button clears the game board",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.clickMultipleSquaresNoWinner();
      await homePage.resetBtn.click();
      await gameUtils.expectBoardCleared();
    }
  );

  test(
    "Verify going back in history updates current player correctly",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSquare(0); // X
      await homePage.clickSquare(1); // O
      await homePage.historyItems.nth(0).click();
      await expect(homePage.nextPlayerHeader).toHaveText(/Next player: O/);
    }
  );
});
