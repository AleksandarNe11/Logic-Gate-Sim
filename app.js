import * as PIXI from '/pixi.mjs';
import { Graphics } from './pixi.mjs';
import { Add_Ticker } from './src/RenderLoop/ticker.js';
import {  GateButtons, Controlbar, line, CreateButton } from './src/Components/presetContainers.js';
import { enableLineDrawingBehaviour } from './src/elementBehaviour/lineDrawBehaviour.js';

//globals 
let drawingLine = false;

const Application = PIXI.Application; 

export const app = new Application({
    width: 500, 
    height: 500, 
    backgroundColor: 0x2c3e50
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
// let gate_container = new GateContainer(app, "AND");
// let new_container = new GateContainer(app, "NOR");

// Controllers
// let lowInput_bar = new Controlbar(app, "Low", 0, -35, 44, -20);
// let highInput_bar = new Controlbar(app, "High", 0, 75, 44, 92);
let input_bar = new Controlbar(app, "Input", 0, 35, 44, 50);
let output_bar = new Controlbar(app, "Output", window.innerWidth - 90, 35, window.innerWidth - 45, 50);


// lines
let input_line = new line(app, -50, -130);
let output_line = new line(app, 1010, -130);


// Buttons
let create = new CreateButton(app, "Create")
let and_button = new GateButtons(app, "AND", 100, 350, 150, 375);
let or_button = new GateButtons(app, "OR", 220, 350, 270, 375);
let not_button = new GateButtons(app, "NOT", 340, 350, 390, 375);

document.body.appendChild(app.view);


// testing section



export {drawingLine}