const nextPlayerHeader_Text = "Next player: ";
const historyHeader_Text = "History";
const goToGameStartBtn_Name = "Go to game start";
const resetBtn_Name = "Reset";
const squares_Id = "button.square";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.historyHeader = page.getByText(historyHeader_Text);
    this.nextPlayerHeader = page.getByText(nextPlayerHeader_Text, {
      exact: false,
    });
    this.goToGameStartBtn = page.getByRole("button", {
      name: goToGameStartBtn_Name,
    });
    this.resetBtn = page.getByRole("button", { name: resetBtn_Name });
    this.squares = page.locator(squares_Id);
    this.historyItems = page.getByRole("button", { name: /Go to move/i });
    this.winnerMessage = page.getByText(/Winner/);
  }

  async clickGoToGameStartBtn() {
    await this.goToGameStartBtn.click();
  }

  async clickResetBtn() {
    await this.resetBtn.click();
  }

  async clickSquare(index) {
    await this.squares.nth(index).click();
  }
}
