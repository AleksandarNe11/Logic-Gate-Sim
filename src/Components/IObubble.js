import { Graphics } from "../../pixi.mjs";
import { enableLineDrawingBehaviour } from "../elementBehaviour/lineDrawBehaviour.js";
import { app } from "../../app.js";
import { EmitterSingleton } from "../EventHandler/EmitterSingleton.js";
import { drawingLine } from "../../app.js";

export class IObubble extends Graphics { 
    constructor(num) { 
        super();
        this.index = num;
        this.em = new EmitterSingleton().getEmitter();
    }
    
    static createInputBubble(inputIndex, xcoord=0, ysep = 50, yoffset = 25) { 
        let input = new IObubble(inputIndex);
        input.beginFill(0x000000)
            .drawCircle(0, ysep*(inputIndex) + yoffset, 15)
            .endFill(); 
        input.type = "input";

        // Adding event listener
        input.interactive = true;
        input.buttonMode = true;
        
        input.on('mouseover', (mouseData) => { 
            input.alpha = 0.5; 
            input.em.emit('hover-input', input)
            console.log(input);
        });
        input.on('mouseout', (mouseData) => { 
            input.alpha = 1; 
            input.em.emit('unhover-input', input)
        });

        return input; 
    }

    static createOutputBubble(outputIndex, xcoord=100, ysep = 50) { 
        let output = new IObubble(outputIndex);
        output.beginFill(0x000000)
            .drawCircle(xcoord, ysep*(outputIndex) + 50, 15)
            .endFill(); 

        output.type = "output"; 
        output.interactive = true; 
        output.buttonMode = true;
        
        output.on('mouseover', (mouseData) => { 
            output.alpha = 0.5; 
            output.em.emit('hover-output', output)
        });
        output.on('mouseout', (mouseData) => { 
            output.alpha = 1; 
            output.em.emit('unhover-output', output)
        });

        return output; 
    }

    changeColor(){
        if(this.tint !== 0xFF0000){
            this.tint = 0xFF0000
        } else {
            this.tint = 0x000000
        }
    }
}