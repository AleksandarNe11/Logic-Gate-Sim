import { Graphics } from "../../pixi.mjs";
import { EmitterSingleton } from "../EventHandler/EmitterSingleton.js";


function enableLineDrawingBehaviour(app) { 
    let context = { 
        lines: [],
        initialMoveTo: [],
        background: app.stage,
        eventEmitter: new EmitterSingleton().getEmitter(), 
        isOnOutput: false, 
        isOnInput: false,
        lastOutput: undefined,
        lastInput: undefined, 
        dragStartOutput: undefined,
        dragEndInput: undefined, 
    }
    context.eventEmitter
        .on('hover-input', (input) => { 
            context.isOnInput = true; 
            context.lastInput = input})
        .on('unhover-input', (input) => { context.isOnInput = false})
        .on('hover-output', (output) => {
            context.isOnOutput = true;
            context.lastOutput = output;
        })
        .on('unhover-output', (output) => {context.isOnOutput = false});
    
    //background behaviour
    context.background.interactive = true; 
    context.background
        .on('mousedown', (event) => {onDragStart(event, context)})
        .on('mousemove', (event) => {onDragMove(event, context)})
        .on('mouseup', (event) => {onDragEnd(event, context)});
    
}

function onDragStart(event, context) { 
    if (context.isOnOutput) { 
        context.dragStartOutput = context.lastOutput;
        context.background.isCreatingLine = true;

        let mouseX = event.data.global.x; 
        let mouseY = event.data.global.y; 
    
        context.initialMoveTo = [mouseX, mouseY]; 
    
        let line = new Graphics();
        line.lineStyle(6, 0x000000); 
        line.moveTo(mouseX, mouseY); 
    
        context.lines = [line].concat(line);
    
        context.background.addChild(line);
    }
}

function onDragMove(event, context) { 
    if (context.background.isCreatingLine) { 
        let mouseX = event.data.global.x;
        let mouseY = event.data.global.y; 
        context.lines[0].clear();
        context.lines[0].lineStyle(6, 0x000000);
        context.lines[0].moveTo(context.initialMoveTo[0], context.initialMoveTo[1]); 
        context.lines[0].lineTo(mouseX, mouseY);
    }
}

function onDragEnd(event, context) { 
    if (!context.isOnInput) { 
        if (context.lines[0])
            context.lines[0].clear();
    } else { 
        // a bit of a hacky solution but this basically creates a fake line 
        // to make sure that the line isn't cleared if it hits the correct 
        // endpoint
        

        let line = new Graphics();
        context.lines = [line].concat(line);
    }
    context.background.isCreatingLine = false;
    if (context.isOnOutput && context.lastOutput === context.dragStartOutput) { 
        console.log(context.lastOutput);
        context.lastOutput.changeColor();
    }
}

export {enableLineDrawingBehaviour}