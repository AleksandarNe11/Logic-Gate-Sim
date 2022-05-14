import { Graphics } from "../pixi.mjs";
import { enableLineDrawingBehaviour } from "../elementBehaviour/lineDrawBehaviour.js";
import { app } from "../app.js";

function createIObubble() { 

}

export class IObubble extends Graphics { 
    constructor(num) { 
        super();
        
        // console.log(this);
    }
    
    static createInputBubble(inputIndex) { 
        let input = new IObubble(inputIndex);
        input.beginFill(0x000000)
            .drawCircle(0, 50*(inputIndex) + 25, 15)
            .endFill(); 
        input.type = "input";

        // Adding event listener
        input.interactive = true;
        input.buttonMode = true;
        input.on("click", drawLine) 
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


function drawLine(){
    enableLineDrawingBehaviour(app)
}