import * as PIXI from '/pixi.mjs';
import { Graphics } from './pixi.mjs';
import { Add_Ticker } from './RenderLoop/ticker.js';
import {  GateContainer, AndButtons , OrButtons } from './Components/presetContainers.js';
import { enableLineDrawingBehaviour } from './elementBehaviour/lineDrawBehaviour.js';
import { IObubble } from './Components/IObubble.js';


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

let iob = new IObubble();
app.stage.addChild(iob);


let ticker_instance = new Add_Ticker(app);
let gate_container = new GateContainer(app, "AND");
let new_container = new GateContainer(app, "NOR");
let and_button = new AndButtons(app, "AND");
let or_button = new OrButtons(app, "OR")
// enableLineDrawingBehaviour(app);


document.body.appendChild(app.view);