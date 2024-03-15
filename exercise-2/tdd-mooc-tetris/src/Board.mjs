export class Board {
  width;
  height;
  board;
  isFalling;
  fallingBlock;
  fallingBlockX;
  fallingBlockY;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.isFalling = false;
    for (let i = 0; i < this.height; i++) {
      this.board.push(Array(this.width).fill("."));
    }
  }

  placeBlock(y, x) {
    this.board[y][x] = this.fallingBlock;
    this.fallingBlockX = x;
    this.fallingBlockY = y;
    return true;
  }

  drop(block) {
    if (this.isFalling) {
      throw new Error("already falling")
    }
    this.fallingBlock = block;
    this.placeBlock(0, Math.floor((this.width - block.shape.sideLength) / 2));
    this.isFalling = true;
  }

  tick() {
    let changed = false;
    for (let i = this.height - 1; i > 0; i--) {
      for (let j = 0; j < this.width; j++) {
        if (this.board[i-1][j] !== "." && this.board[i][j] === ".") {
          this.board[i][j] = this.board[i-1][j];
          this.board[i-1][j] = ".";
          changed = true;
        }
      }
    this.isFalling = changed;
  }}

  hasFalling() {
    return this.isFalling;
  }

  toString() {
    let str = [];
    for (let i = 0; i < this.height; i++) {
      let row = this.board[i].join("");
      str.push(row + "\n");
    }
    return str.join("");
  }
}
