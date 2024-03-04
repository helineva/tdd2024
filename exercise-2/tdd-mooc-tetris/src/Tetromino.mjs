import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
    static SHAPES = { "T" : ".T.\nTTT\n..." };
    static get T_SHAPE() {
        return new Tetromino("T");
    }

    shape;

    constructor(tetromino="T") {
        this.shape = RotatingShape.fromString(Tetromino.SHAPES[tetromino]);
    }

    toString() {
        return this.shape.toString();
    }
}