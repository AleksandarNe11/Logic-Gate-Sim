import { Graphics } from "../pixi.mjs";

function createIObubble() { 

}

export class IObubble extends Graphics { 
    constructor(num) { 
        super();
        
        console.log(this);
    }
    
    static createInputBubble(inputIndex) { 
        let input = new IObubble(inputIndex);
        input.beginFill(0x000000)
            .drawCircle(0, 50*(inputIndex) + 25, 15)
            .endFill(); 
        input.type = "input"; 
        return input; 
    }

    static createOutputBubble(outputIndex) { 
        let output = new IObubble(outputIndex);
        output.beginFill(0x000000)
            .drawCircle(100, 50, 15)
            .endFill(); 
        output.type = "output";   
        return output; 
    }
}