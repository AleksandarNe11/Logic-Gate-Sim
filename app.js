import * as PIXI from '/pixi.mjs';
import { Graphics } from './pixi.mjs';
import { Add_Ticker } from './src/RenderLoop/ticker.js';
import {  AndButton, OrButton, NotButton, ControlBar, line, CreateButton } from './src/Components/presetContainers.js';
import { enableLineDrawingBehaviour } from './src/elementBehaviour/lineDrawBehaviour.js';
import * as gates from "./src/LogicElements/gates.js";

//globals 
let drawingLine = false;

const Application = PIXI.Application; 

export const app = new Application({
    width: 500, 
    height: 500, 
    backgroundColor: 0x2c3e50
    // backg

});
app.renderer.resize(window.innerWidth, window.innerHeight);

const background = new Graphics(); 
background
    .beginFill(0x2c3e50)
    .lineStyle(1, 0xFFFFF)
    .drawRect(0, 0, window.innerWidth, window.innerHeight)
background.interactive = true; 
app.stage.addChild(background);


enableLineDrawingBehaviour(app)

let ticker_instance = new Add_Ticker(app);


let a = (7 /100) * window.innerWidth;
let b = (12.5 / 100) * window.innerHeight;


// lines
let input_line = new line(app, a , b, "input");
let output_line = new line(app, window.innerWidth - a, b, "output");

// Controllers
let inputAddBar = new ControlBar(app, "Add", 
    (0.5/100)*window.innerWidth, window.innerHeight*.45, 
    input_line
);
let remove_bar = new ControlBar(app, "Remove", 
    (0.5/100)*window.innerWidth, window.innerHeight*.55, 
    input_line
);
let outputAddBar = new ControlBar(app, "Add", 
    (94.5/100)*window.innerWidth, window.innerHeight*.45,
    output_line
);
let outputRemoveBar = new ControlBar(app, "Remove", 
    (94.5/100)*window.innerWidth, window.innerHeight*.55,
    output_line
);


// Buttons
let create = new CreateButton(app, "Create", 200, window.innerHeight*.9)
let and_button = new AndButton(app, "AND", 320, window.innerHeight*.9);
let or_button = new OrButton(app, "OR", 440, window.innerHeight*.9);
let not_button = new NotButton(app, "NOT", 560, window.innerHeight*.9);

document.body.appendChild(app.view);


// testing section
function testChips() { 
    
    let chipInput1 = new gates.StartingInput([], "input1");
    let chipInput2 = new gates.StartingInput([], "input2");
    
    console.log(chipInput1);
    
    let and1input1 = new gates.Input([], [], "and1input1");
    and1input1.addInput(chipInput1);
    let and1input2 = new gates.Input([], [], "and1input2");
    and1input2.addInput(chipInput2);
    let and1 = new gates.ANDOutput([], [], 'and1');
    and1.addInput(and1input1);
    and1.addInput(and1input2);
    
    let chipOutput = new gates.ChipOutput([], [], "OutputChip"); 
    chipOutput.addInput(and1);
    // stop here for now
    setTimeout(() => { 
        chipInput1.activate();
        console.log(and1);
        console.log(chipOutput);
    }, 1000);
    setTimeout(() => { 
        chipInput2.activate();
        console.log(and1);
        console.log(chipOutput);
    });
}
testChips();


// let and2input1 = new gates.Input([]);
// let and2input2 = new gates.Input([]);
// let and2 = new gates.ANDOutput([and2input1, and2input2], []);


export {drawingLine}