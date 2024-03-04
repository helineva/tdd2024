import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
    static get T_SHAPE() {
        return new Tetromino(RotatingShape.fromString(".T.\nTTT\n..."));
    }

    shape;

    constructor(shape) {
        this.shape = shape;
    }

    rotateLeft() {
        return new Tetromino(this.shape.rotateLeft());
    }

    rotateRight() {
        return new Tetromino(this.shape.rotateRight());
    }

    toString() {
        return this.shape.toString();
    }
}