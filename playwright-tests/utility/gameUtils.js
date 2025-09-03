import { expect } from "@playwright/test";

export class GameUtils {
  constructor(page, homePage) {
    this.page = page;
    this.homePage = homePage;
  }

  // Always the top row win
  async playWinningGame(player = "X") {
    await this.homePage.clickSquare(0);
    await this.homePage.clickSquare(3);
    await this.homePage.clickSquare(1);
    await this.homePage.clickSquare(4);
    await this.homePage.clickSquare(2);
  }

  async playWinningCombo(combo, winner = "X") {
    // Squares that are NOT part of the winning line
    const fillers = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(
      (i) => !combo.includes(i)
    );

    // Pick two filler squares (enough to alternate turns)
    const filler1 = fillers[0];
    const filler2 = fillers[1];

    // Build the exact sequence of moves
    let moves = [];

    moves =
      winner === "X"
        ? [combo[0], filler1, combo[1], filler2, combo[2]]
        : [filler1, combo[0], filler2, combo[1], combo[2]];

    // Play the moves in order
    for (const square of moves) {
      await this.homePage.clickSquare(square);
    }
  }

  async expectBoardCleared() {
    const squares = await this.homePage.squares.allTextContents();
    expect(squares).toEqual(["", "", "", "", "", "", "", "", ""]);
  }

  async playDrawGame() {
    // Sequence that leads to a draw
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    for (const move of moves) {
      await this.homePage.clickSquare(move);
    }
  }

  async clickAllSquaresWithReset() {
    for (let i = 0; i < 9; i++) {
      await this.homePage.clickSquare(i);
      await expect(this.homePage.squares.nth(i)).not.toBeEmpty();
      await this.homePage.clickResetBtn();
      await this.expectBoardCleared();
    }
  }

  async clickMultipleSquaresNoWinner(n) {
    for (let i = 0; i < n; i++) {
      await this.homePage.clickSquare(i);
    }
  }
}
