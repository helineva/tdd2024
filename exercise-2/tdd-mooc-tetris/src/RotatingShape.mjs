export class RotatingShape {
    static fromString(str) { return new RotatingShape(str); }
    shape;
    constructor(str) { this.shape = str.split("\n").map(s => { return s.replace(/\s+/g, ""); }) }
    toString() { return this.shape.join("\n") + "\n"; }
}