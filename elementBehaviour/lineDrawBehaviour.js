import { Graphics } from "../pixi.mjs";


function enableLineDrawingBehaviour(app) { 
    app.stage.interactive = true;

    let context = { 
        lines: [],
        initialMoveTo: [],
        background: app.stage
    }

    let initialMoveTo; 

    context.background
        .on('mousedown', (event) => {onDragStart(event, context)})
        .on('mousemove', (event) => {onDragMove(event, context)})
        .on('mouseup', (event) => {onDragEnd(event, context)})
    
}

function onDragStart(event, context) { 
    context.background.isCreatingLine = true;

    let mouseX = event.data.global.x; 
    let mouseY = event.data.global.y; 

    context.initialMoveTo = [mouseX, mouseY]; 

    let line = new Graphics();
    line.lineStyle(1, 0x000000); 
    line.moveTo(mouseX, mouseY); 

    context.lines = [line].concat(line);

    context.background.addChild(line);
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
    context.background.isCreatingLine = false;
}

export {enableLineDrawingBehaviour}