export class Board {
  width;
  height;
  board;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.falling = false;
    for (let i = 0; i < this.height; i++) {
      this.board.push(Array(this.width).fill("."));
    }
  }

  drop(block) {
    if (this.falling) {
      throw new Error("already falling")
    }
    this.board[0][1] = "X";
    this.falling = true;
  }

  tick() {
    let changed = false
    for (let i = this.height - 1; i > 0; i--) {
      for (let j = 0; j < this.width; j++) {
        if (this.board[i-1][j] === "X") {
          this.board[i-1][j] = ".";
          this.board[i][j] = "X";
          changed = true
        }
      }
    this.falling = changed;
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
