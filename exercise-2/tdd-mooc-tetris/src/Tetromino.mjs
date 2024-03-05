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
        return new Tetromino(this.shape.rotateLeft());
    }

    rotateRight() {
        return new Tetromino(this.shape.rotateRight());
    }

    toString() {
        return this.shape.toString();
    }
}