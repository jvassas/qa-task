import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { GameUtils } from "../utility/gameUtils";

test.describe("Tic Tac Toe Game Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "a square cannot be played twice",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSquare(0);
      await homePage.clickSquare(0);
      await expect(homePage.squares.nth(0)).toHaveText("X");
    }
  );

  test(
    "no moves allowed after a win",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await gameUtils.playWinningGame("X");
      await expect(homePage.winnerMessage).toContainText("Winner: X");
      await homePage.clickSquare(5);
      await expect(homePage.squares.nth(5)).toHaveText(""); //should be whatever the baord is
    }
  );

  test("should declare a draw when board is full with no winner", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const gameUtils = new GameUtils(page, homePage);
    await gameUtils.playDrawGame();
    await expect(homePage.winnerMessage).not.toBeVisible();
    await expect(homePage.nextPlayerHeader).toBeVisible();
  });

  test(
    "all winning scenarios are detected",
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
    "reset clears history as well as board",
    { tag: "@regression" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const gameUtils = new GameUtils(page, homePage);
      await homePage.clickSquare(0);
      await homePage.resetBtn.click();
      await expect(homePage.historyItems).not.toBeVisible();
      await gameUtils.expectBoardCleared();
    }
  );

  test(
    "going back in history updates current player correctly",
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
