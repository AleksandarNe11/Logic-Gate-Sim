import * as PIXI from '/pixi.mjs';
import { Graphics } from './pixi.mjs';
import { Add_Ticker } from './src/RenderLoop/ticker.js';
import {  AndButton, OrButton, NotButton, Controlbar, line, CreateButton } from './src/Components/presetContainers.js';
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

// Controllers
let input_bar = new Controlbar(app, "Input", 0, 35, 44, 50);
let output_bar = new Controlbar(app, "Output", window.innerWidth - 90, 35, window.innerWidth - 45, 50);


// lines
let input_line = new line(app, -50, -130);
let output_line = new line(app, 1010, -130);


// Buttons
let create = new CreateButton(app, "Create")
let and_button = new AndButton(app, "AND", 100, 350, 150, 375);
let or_button = new OrButton(app, "OR", 220, 350, 270, 375);
let not_button = new NotButton(app, "NOT", 340, 350, 390, 375);

document.body.appendChild(app.view);


// testing section



export {drawingLine}