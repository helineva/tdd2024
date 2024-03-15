export class RotatingShape {

    static fromString(str) {
        return new RotatingShape(str);
    }
    
    sideLength;
    layout;
    
    constructor(str) {
        this.layout = str.split("\n").map(s => { return s.replace(/\s+/g, ""); })
        this.sideLength = this.layout.length;
    }

    rotateLeft() {
        let str = [];

        for (let h = 0; h < this.sideLength; h++) {

            for (let w = 0; w < this.sideLength; w++) {
                str.push(this.layout[w][this.sideLength - 1 - h]);
            }
            
            if (h < this.sideLength - 1) str.push("\n");
        }
        
        return RotatingShape.fromString(str.join(""));
    }

    rotateRight() {
        let str = [];
 
        for (let h = 0; h < this.sideLength; h++) {
        
            for (let w = 0; w < this.sideLength; w++) {
                str.push(this.layout[this.sideLength - 1 - w][h]);
            }
        
            if (h < this.sideLength - 1) str.push("\n");
        }

        return RotatingShape.fromString(str.join(""));
    }

    toString() {
        return this.layout.join("\n") + "\n";
    }
}