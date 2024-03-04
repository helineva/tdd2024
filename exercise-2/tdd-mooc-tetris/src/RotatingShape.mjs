export class RotatingShape {
    static fromString(str) {
        return new RotatingShape(str);
    }
    
    height;
    width;
    shape;
    
    constructor(str) {
        this.shape = str.split("\n").map(s => { return s.replace(/\s+/g, ""); })
        this.height = this.shape.length;
        this.width = this.shape[0].length;
    }

    toString() {
        return this.shape.join("\n") + "\n";
    }
}