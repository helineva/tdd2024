import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

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

  roomForBlock(block, y, x) {
    for (let j = 0; j < block.shape.sideLength; j++) {
      for (let i = 0; i < block.shape.sideLength; i++) {
        if (block.shape.layout[j][i] !== ".") {
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
    for (let j = 0; j < this.fallingBlock.shape.sideLength; j++) {
      for (let i = 0; i < this.fallingBlock.shape.sideLength; i++) {
        if (this.fallingBlock.shape.layout[j][i] !== "." && this.fallingBlockY+j >= 0 && this.fallingBlockY+j < this.height && this.fallingBlockX+i >= 0 && this.fallingBlockX+i < this.width) {
          this.board[this.fallingBlockY+j][this.fallingBlockX+i] = this.fallingBlock.shape.layout[j][i];
        }
      }
    }
  }

  drop(block) {
    if (this.isFalling) {
      throw new Error("already falling")
    }
    let y = 0;
    let x = Math.floor((this.width - block.shape.sideLength) / 2);    
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
      for (let j = 0; j < this.fallingBlock.shape.sideLength; j++) {
        for (let i = 0; i < this.fallingBlock.shape.sideLength; i++) {
          if (this.fallingBlock.shape.layout[j][i] !== "." && this.fallingBlockY+j >= 0 && this.fallingBlockY+j < this.height && this.fallingBlockX+i >= 0 && this.fallingBlockX+i < this.width) {
            str[(this.width+1)*(this.fallingBlockY+j)+this.fallingBlockX+i] = this.fallingBlock.shape.layout[j][i];
          }
        }
      }
    }
    return str.join("");
  }
}
