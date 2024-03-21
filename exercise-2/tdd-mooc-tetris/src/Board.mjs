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

  moveBlock(block, y, x) {
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
    if (this.moveBlock(this.fallingBlock, this.fallingBlockY, this.fallingBlockX - 1)) {
      this.fallingBlockX--;
    }
  }

  moveRight() {
    if (this.moveBlock(this.fallingBlock, this.fallingBlockY, this.fallingBlockX + 1)) {
      this.fallingBlockX++;
    }
  }

  moveDown() {
    if (this.moveBlock(this.fallingBlock, this.fallingBlockY + 1, this.fallingBlockX)) {
      this.fallingBlockY++;
    }
  }

  rotate(block) {
    return this.moveBlock(block, this.fallingBlockY, this.fallingBlockX);
  }

  rotateLeft() {
    if (this.rotate(this.fallingBlock.rotateLeft())) this.fallingBlock = this.fallingBlock.rotateLeft();
  }

  rotateRight() {
    if (this.rotate(this.fallingBlock.rotateRight())) this.fallingBlock = this.fallingBlock.rotateRight();
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
    this.moveBlock(block, 0, Math.floor((this.width - block.shape.sideLength) / 2));
    this.fallingBlockY = 0;
    this.fallingBlockX = Math.floor((this.width - block.shape.sideLength) / 2);
    this.isFalling = true;
  }

  tick() {    
    if (this.isFalling) {
      if (this.moveBlock(this.fallingBlock, this.fallingBlockY + 1, this.fallingBlockX)) this.fallingBlockY++;
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
