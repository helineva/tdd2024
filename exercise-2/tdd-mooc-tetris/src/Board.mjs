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

  moveBlock(y, x) {
    for (let j = 0; j < this.fallingBlock.shape.sideLength; j++) {
      for (let i = 0; i < this.fallingBlock.shape.sideLength; i++) {
        if (this.fallingBlock.shape.layout[j][i] !== ".") {
          if (y+j < 0 || y+j >= this.height || x+i < 0 || x+i >= this.width || this.board[y+j][x+i] !== ".") return false;
        }
      }
    }
    
    this.fallingBlockX = x;
    this.fallingBlockY = y;  
    return true;
  }

  moveLeft() {
    this.moveBlock(this.fallingBlockY, this.fallingBlockX - 1);
  }

  moveRight() {
    this.moveBlock(this.fallingBlockY, this.fallingBlockX + 1);
  }

  moveDown() {
    this.moveBlock(this.fallingBlockY + 1, this.fallingBlockX);
  }

  rotate(direction="R") {
    let rotatedBlock = direction == "L" ? this.fallingBlock.rotateLeft() : this.fallingBlock.rotateRight();
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
    this.fallingBlock = block;
    this.moveBlock(0, Math.floor((this.width - block.shape.sideLength) / 2));
    this.isFalling = true;
  }

  tick() {    
    if (this.isFalling) {
      this.isFalling = this.moveBlock(this.fallingBlockY + 1, this.fallingBlockX);
      if (!this.isFalling) {
        this.placeBlock();
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
