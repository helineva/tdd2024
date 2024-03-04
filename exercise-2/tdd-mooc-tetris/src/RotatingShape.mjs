export class RotatingShape {

    static fromString(str) {
        return new RotatingShape(str);
    }
    
    side;
    shape;
    
    constructor(str) {
        this.shape = str.split("\n").map(s => { return s.replace(/\s+/g, ""); })
        this.side = this.shape.length;
    }

    rotateLeft() {
        let str = [];

        for (let h = 0; h < this.side; h++) {

            for (let w = 0; w < this.side; w++) {
                str.push(this.shape[w][this.side - 1 - h]);
            }
            
            if (h < this.side - 1) str.push("\n");
        }
        
        return RotatingShape.fromString(str.join(""));
    }

    rotateRight() {
        let str = [];
 
        for (let h = 0; h < this.side; h++) {
        
            for (let w = 0; w < this.side; w++) {
                str.push(this.shape[this.side - 1 - w][h]);
            }
        
            if (h < this.side - 1) str.push("\n");
        }

        return RotatingShape.fromString(str.join(""));
    }

    toString() {
        return this.shape.join("\n") + "\n";
    }
}