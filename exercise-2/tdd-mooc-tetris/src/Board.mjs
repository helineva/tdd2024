export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    for (let i = 0; i < this.height; i++) {
      this.board.push(Array(this.width).fill("."));
    }
  }

  drop(block) {
    this.board[0][1] = "X";
  }

  tick() {
    for (let i = this.height - 1; i > 0; i--) {
      for (let j = 0; j < this.width; j++) {
        if (this.board[i-1][j] === "X") {
          this.board[i-1][j] = ".";
          this.board[i][j] = "X";
        }
      }
  }}

  toString() {
    let str = [];
    for (let i = 0; i < this.height; i++) {
      let row = this.board[i].join("");
      str.push(row + "\n");
    }
    return str.join("");
  }
}
