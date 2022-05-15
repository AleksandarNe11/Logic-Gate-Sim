import { Application, Container, Graphics } from '../../pixi.mjs'
import { setDraggable } from '../elementBehaviour/dragDropBehaviour.js';
import { Text } from '../../pixi.mjs';
import { IObubble } from './IObubble.js';
import { app } from '../../app.js';
import * as gates from '../LogicElements/gates.js'
// import { Graphics } from "../pixi.mjs";


let totalButtons = 4;

export class GateContainer { 

    constructor (app, name, numInputs, numOutputs) { 
        this.container = new Container();
        this.app = app; 
        this.numInputs = numInputs;
        this.numOutputs = numOutputs;
        this.createChildren(name);
        setDraggable(this.container, app);
        this.container.x = 200; 
        this.container.y = 200; 
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect()
        )
        this.container.addChild(
            this.generateText(name)
        )
        for (let i = 0; i < this.numInputs; i++) { 
            this.container.addChild(
                IObubble.createInputBubble(i)
            )
        }
        for (let i = 0; i < this.numOutputs; i++) { 
            this.container.addChild(
                IObubble.createOutputBubble(i)
            )
        }
    }   

    generateRect() {

        // height = max(this.numInputs, this.numOutputs);
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 100, 100)
        .endFill(); 

        return rect;
    }

    generateText(name) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(50,50);
        return text;
    }
}

export class AndButton {

    constructor (app, name, x, y) { 
        this.container = new Container();
        this.app = app; 
        this.xcoord = x;
        this.ycoord = y;
        this.createChildren(name)
        this.container.x = x; 
        this.container.y = y;
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.xcoord, this.ycoord)
        )
        this.container.addChild(
            this.generateText(name)
        ) 
    }   
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 100, 50)
        .endFill();
        
        // Added Event 
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on("click", createAndGate);

        return rect;
    }

    generateText(name, textX, textY) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(50, 25);
        return text;
    }
}

export class OrButton {

    constructor (app, name, x, y) { 
        this.container = new Container();
        this.app = app; 
        this.xcoord = x;
        this.ycoord = y;
        this.createChildren(name);
        this.container.x = x; 
        this.container.y = y;
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.xcoord, this.ycoord)
        )
        this.container.addChild(
            this.generateText(name)
        )
    }   
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 100, 50)
        .endFill();
        
        // Added Event 
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on("click", createOrGate);

        return rect;
    }

    generateText(name, textX, textY) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(50, 25);
        return text;
    }
}


export class NotButton {

    constructor (app, name, x, y) { 
        this.container = new Container();
        this.app = app; 
        this.xcoord = x;
        this.ycoord = y;
        this.createChildren(name)
        this.container.x = x;
        this.container.y = y;
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.xcoord, this.ycoord)
        )
        this.container.addChild(
            this.generateText(name)
        )
    }   
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 100, 50)
        .endFill();
        
        // Added Event 
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on("click", createNotGate);

        return rect;
    }

    generateText(name, textX, textY) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(50, 25);
        return text;
    }
}

export class ControlBar {

    constructor (app, name, x, y, line) { 
        this.container = new Container();
        this.app = app; 
        this.name = name;
        this.xcoord = x;
        this.ycoord = y;
        this.line = line;


        this.createChildren(name);
        this.container.x = x;
        this.container.y = y;
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.xcoord, this.ycoord)
        )
        this.container.addChild(
            this.generateText(name)
        )
    }   

    generateRect(rectX, rectY) {
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 100, 50)  // 0 , 35
        .endFill();

        // Added Event 
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on('mouseover', () => { 
            console.log("test")
        });
        let line = this.line; 
        console.log(line);
        if (this.name === "Add")
            rect.on("click", () => { 
                line.addBubble()
            });
        if (this.name === "Remove")
            rect.on("click", () => { 
                line.removeBubble()
            });

        return rect;
    }

    generateText(name, textX, textY) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(50, 25);   // 37, 50
        return text;
    }
}

export class line {

    constructor (app, lineX, lineY, type) { 
        this.container = new Container();
        this.app = app; 
        this.lineX = lineX;
        this.lineY = lineY;
        this.createChildren()
        this.container.x = lineX;
        this.container.y = lineY;
        this.type = type;
        this.bubbles = [];
    }

    
    createChildren() { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.lineX, this.lineY)
        )
        
        // this.container.addChild(
        //     in 

    }  

    generateRect() {
        const rect = new Graphics();
        rect.beginFill(0x000000)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 5, (75/100)*(window.innerHeight))
        .endFill();

        return rect;
    }

    addBubble() { 
        if (this.type === "input") { 
            let input = IObubble.createOutputBubble(this.bubbles.length, 0, 200);
            this.container.addChild(input);
            this.bubbles.push(input);
            input.node = new gates
        } else { 
            let output = IObubble.createInputBubble(this.bubbles.length, 0, 200);
            this.container.addChild(output)
            this.bubbles.push(output);
        }
    }

    removeBubble() { 
        if (this.type === "input") { 
            let input = this.bubbles[this.bubbles.length - 1];
            this.container.removeChild(input)
            this.bubbles.pop(input);
        } else { 
            let input = this.bubbles[this.bubbles.length - 1];
            this.container.removeChild(input)
            this.bubbles.pop(input);
        }
    }
}

export class CreateButton {

    constructor (app, name, x, y) { 
        this.container = new Container();
        this.app = app; 
        this.xcoord = x;
        this.ycoord = y;
        this.createChildren(name);
        this.container.x = x;
        this.container.y = y;
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.xcoord, this.ycoord)
        )
        this.container.addChild(
            this.generateText(name)
        ) 
    }   

    generateRect() {
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 100, 50)
        .endFill(); 

        // Addded Event
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on("click", create);

        return rect;
    }

    generateText(name) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(50,25);
        return text;
    }
}


export class inputCircles extends Graphics{

    constructor(num) { 
        super();
    }

    static createInputBubble(inputIndex) { 
        let input = new IObubble(inputIndex);
        input.beginFill(0x000000)
            .drawCircle(0, 50*(inputIndex) + 25, 15)
            .endFill(); 
        input.type = "input";

        // // Adding event listener
        // input.interactive = true;
        // input.buttonMode = true;
        // input.on("click", drawLine) 
        return input; 
    }
}

export class userSavedButton {

    constructor (app, name, x, y) { 
        this.container = new Container();
        this.app = app;
        this.xcoord = x;
        this.ycoord = y;
        this.createChildren(name)
        this.container.x = x;
        this.container.y = y;
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.xcoord, this.ycoord)
        )
        this.container.addChild(
            this.generateText(name)
        )
    } 
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(0, 0, 100, 50)


        .endFill();
        console.log("In the button" + totalButtons);
        
        // Added Event 
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on("click", createNewGate);

        return rect;
    }

    generateText(name) { 

        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(50, 25);
        return text;
    }
}

function createAndGate () {
    let newAndGates = new GateContainer(app, "AND", 2, 1);
    console.log("New gate created");
}

function createOrGate () {
    let newOrGate = new GateContainer(app, "OR", 2, 1);
    console.log("New gate created");
}

function createNotGate () {
    let newNotGate = new GateContainer(app, "NOT", 1, 1);
    console.log("New gate created");
}


export let chipName;

function create() {
    chipName = prompt("What is the name of this chip??");
    totalButtons = totalButtons + 1; 
    let new_gate = new userSavedButton(app, chipName, (totalButtons+1)*100 + (totalButtons-1)*20, window.innerHeight*.9);
    console.log(totalButtons);
    console.log(chipName);
}

function createNewGate(){
    console.log("Button being used")
}











