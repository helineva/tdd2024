export class Board {
  width;
  height;
  board;
  isFalling;
  fallingBlock;
  fallingBlockX;
  fallingBlockY;
  scorers;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.isFalling = false;
    for (let i = 0; i < this.height; i++) {
      this.board.push(Array(this.width).fill("."));
    }
    this.scorers = [];
  }

  registerScorer(scorer) {
    this.scorers.push(scorer);
  }

  setBoard(s) {
    this.board = s.trim().split("\n").map(t => t.split(""));
    this.height = this.board.length;
    this.width = this.board[0].length;
  }

  roomForBlock(block, y, x) {
    for (let j = 0; j < block.sideLength; j++) {
      for (let i = 0; i < block.sideLength; i++) {
        if (block.layout()[j][i] !== ".") {
          if (y+j < 0 || y+j >= this.height || x+i < 0 || x+i >= this.width || this.board[y+j][x+i] !== ".") return false;
        }
      }
    }
    return true;
  }

  moveLeft() {
    if (this.roomForBlock(this.fallingBlock, this.fallingBlockY, this.fallingBlockX - 1)) {
      this.fallingBlockX--;
    }
  }

  moveRight() {
    if (this.roomForBlock(this.fallingBlock, this.fallingBlockY, this.fallingBlockX + 1)) {
      this.fallingBlockX++;
    }
  }

  moveDown() {
    if (this.roomForBlock(this.fallingBlock, this.fallingBlockY + 1, this.fallingBlockX)) {
      this.fallingBlockY++;
    }
  }

  rotate(block) {
    let offsets = [0, 1, -1, 2, -2];
    for (let offset of offsets) {
      if (this.roomForBlock(block, this.fallingBlockY, this.fallingBlockX + offset)) {
        this.fallingBlock = block;
        this.fallingBlockX = this.fallingBlockX + offset;
        break;
      }
    }
  }
  rotateLeft() {
    this.rotate(this.fallingBlock.rotateLeft());
  }

  rotateRight() {
    this.rotate(this.fallingBlock.rotateRight());
  }

  placeBlock() {
    for (let j = 0; j < this.fallingBlock.sideLength; j++) {
      for (let i = 0; i < this.fallingBlock.sideLength; i++) {
        if (this.fallingBlock.layout()[j][i] !== "." && this.fallingBlockY+j >= 0 && this.fallingBlockY+j < this.height && this.fallingBlockX+i >= 0 && this.fallingBlockX+i < this.width) {
          this.board[this.fallingBlockY+j][this.fallingBlockX+i] = this.fallingBlock.layout()[j][i];
        }
      }
    }
  }

  clearLines() {
    let target_line = this.height-1;
    for (let j = this.height-1; j >= 0; j--) {
      let full = true;
      for (let i = 0; i < this.width; i++) {
        if (this.board[j][i] === ".") {
          full = false;
          break;
        }
      }
      if (!full) {
        this.board[target_line] = this.board[j];
        target_line--;
      }
    }
    let lines_cleared = target_line+1;
    for (; target_line >= 0; target_line--) {
      this.board[target_line] = Array(this.width).fill(".");
    }
    return lines_cleared;
  }

  drop(block) {
    if (this.isFalling) {
      throw new Error("already falling")
    }
    let y = -1;
    let x = Math.floor((this.width - block.sideLength) / 2);    
    this.roomForBlock(block, y, x);
    this.fallingBlockY = y;
    this.fallingBlockX = x;
    this.isFalling = true;
    this.fallingBlock = block;
  }

  tick() {    
    if (this.isFalling) {
      if (this.roomForBlock(this.fallingBlock, this.fallingBlockY + 1, this.fallingBlockX)) this.fallingBlockY++;
      else {
        this.placeBlock();
        this.isFalling = false;
        let clearedLines = this.clearLines();
        for (let scorer of this.scorers) {
          scorer.addLines(clearedLines);
        }
      }
    }
  }

  hasFalling() {
    return this.isFalling;
  }

  toString() {
    let str = [];
    for (let i = 0; i < this.height; i++) {
      str.push(...this.board[i]);
      str.push("\n");
    }
    if (this.isFalling) {
      for (let j = 0; j < this.fallingBlock.sideLength; j++) {
        for (let i = 0; i < this.fallingBlock.sideLength; i++) {
          if (this.fallingBlock.layout()[j][i] !== "." && this.fallingBlockY+j >= 0 && this.fallingBlockY+j < this.height && this.fallingBlockX+i >= 0 && this.fallingBlockX+i < this.width) {
            str[(this.width+1)*(this.fallingBlockY+j)+this.fallingBlockX+i] = this.fallingBlock.layout()[j][i];
          }
        }
      }
    }
    return str.join("");
  }
}
