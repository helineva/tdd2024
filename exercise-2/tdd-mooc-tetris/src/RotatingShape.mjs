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

    rotateRight() {
        let str = [];
 
        for (let h = 0; h < this.height; h++) {
        
            for (let w = 0; w < this.width; w++) {
                str.push(this.shape[this.width - 1 - w][h]);
            }
        
            if (h < this.height - 1) str.push("\n");
        }

        return RotatingShape.fromString(str.join(""));
    }

    toString() {
        return this.shape.join("\n") + "\n";
    }
}