import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
    static get T_SHAPE() {
        return new Tetromino(RotatingShape.fromString(".T.\nTTT\n..."));
    }

    static get I_SHAPE() {
        return new Tetromino(RotatingShape.fromString(".....\n.....\nIIII.\n.....\n....."), 0, [true, true, false, false]);
    }

    shape;
    orientation;
    valid_orientations;

    constructor(shape, orientation=0, valid_orientations=[true, true, true, true]) {
        this.shape = shape;
        this.orientation = orientation;
        this.valid_orientations = valid_orientations;
    }

    rotateLeft() {
        let i;
        for (i = 0; i < 4; i++) {
            if (this.valid_orientations[(this.orientation - i + 3) % 4]) break;
        }
        switch (i) {
            case 0: return new Tetromino(this.shape.rotateLeft(), (this.orientation - i + 3) % 4, this.valid_orientations);
            case 1: return new Tetromino(this.shape.rotateLeft().rotateLeft(), (this.orientation - i + 3) % 4, this.valid_orientations);
            case 2: return new Tetromino(this.shape.rotateRight(), (this.orientation - i + 3) % 4, this.valid_orientations);
            case 3: return new Tetromino(this.shape, (this.orientation - i + 3) % 4, this.valid_orientations);
        }
    }

    rotateRight() {
        return new Tetromino(this.shape.rotateRight());
    }

    toString() {
        return this.shape.toString();
    }
}