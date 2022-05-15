import { Application, Container, Graphics } from '../../pixi.mjs'
import { setDraggable } from '../elementBehaviour/dragDropBehaviour.js';
import { Text } from '../../pixi.mjs';
import { IObubble } from './IObubble.js';
import { app } from '../../app.js';
// import { Graphics } from "../pixi.mjs";


let totalButtons = 3;

export class GateContainer { 

    constructor (app, name) { 
        this.container = new Container();
        this.app = app; 
        this.createChildren(name)
        setDraggable(this.container, app);
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect()
        )
        this.container.addChild(
            this.generateText(name)
        )
        this.container.addChild(
            IObubble.createInputBubble(0)
        )
        this.container.addChild(
            IObubble.createInputBubble(1)
        )
        this.container.addChild(
            IObubble.createOutputBubble(0)
        )
        this.container.x = 200; 
        this.container.y = 200; 
    }   

    generateRect() {
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

    constructor (app, name, rectX, rectY, textX, textY) { 
        this.container = new Container();
        this.app = app; 
        this.textX = textX;
        this.textY = textY;
        this.rectX = rectX;
        this.rectY = rectY;
        this.createChildren(name)
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.rectX, this.rectY)
        )
        this.container.addChild(
            this.generateText(name, this.textX, this.textY)
        )
        this.container.x = 200; 
        this.container.y = 200; 
    }   
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(rectX, rectY, 100, 50)
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
        text.position.set(textX, textY);
        return text;
    }
}

export class OrButton {

    constructor (app, name, rectX, rectY, textX, textY) { 
        this.container = new Container();
        this.app = app; 
        this.textX = textX;
        this.textY = textY;
        this.rectX = rectX;
        this.rectY = rectY;
        this.createChildren(name)
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.rectX, this.rectY)
        )
        this.container.addChild(
            this.generateText(name, this.textX, this.textY)
        )
        this.container.x = 200; 
        this.container.y = 200; 
    }   
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(rectX, rectY, 100, 50)
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
        text.position.set(textX, textY);
        return text;
    }
}


export class NotButton {

    constructor (app, name, rectX, rectY, textX, textY) { 
        this.container = new Container();
        this.app = app; 
        this.textX = textX;
        this.textY = textY;
        this.rectX = rectX;
        this.rectY = rectY;
        this.createChildren(name)
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.rectX, this.rectY)
        )
        this.container.addChild(
            this.generateText(name, this.textX, this.textY)
        )
        this.container.x = 200; 
        this.container.y = 200; 
    }   
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(rectX, rectY, 100, 50)
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
        text.position.set(textX, textY);
        return text;
    }
}

export class Controlbar {

    constructor (app, name, rectX, rectY, textX, textY) { 
        this.container = new Container();
        this.app = app; 
        this.rectX = rectX;
        this.rectY = rectY;
        this.textX = textX;
        this.textY = textY;
        this.createChildren(name)
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.rectX, this.rectY)
        )
        this.container.addChild(
            this.generateText(name, this.textX, this.textY)
        )
        this.container.x = 0; 
        this.container.y = 200; 
    }   

    generateRect(rectX, rectY) {
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(rectX, rectY, 90, 34)  // 0 , 35
        .endFill();

        // Added Event 
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on("click", createInput);


        return rect;
    }

    generateText(name, textX, textY) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(textX,textY);   // 37, 50
        return text;
    }
}


export class line {

    constructor (app, lineX, lineY) { 
        this.container = new Container();
        this.app = app; 
        this.lineX = lineX;
        this.lineY = lineY;
        this.createChildren()
    }


    
    createChildren() { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.lineX, this.lineY)
        )
        
        // this.container.addChild(
        //     inputCircles.createInputBubble(0)
        // )
        this.container.x = 200; 
        this.container.y = 200; 
    }   

    generateRect(lineX, lineY) {
        const rect = new Graphics();
        rect.beginFill(0x000000)
        .lineStyle(4, 0x000000, 1)
        .drawRect(lineX, lineY, 5, 460)  // -50, -130
        .endFill();

        return rect;
    }

}

export class CreateButton {

    constructor (app, name) { 
        this.container = new Container();
        this.app = app; 
        this.createChildren(name)
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect()
        )
        this.container.addChild(
            this.generateText(name)
        )
        
        this.container.x = 200; 
        this.container.y = 200; 
    }   

    generateRect() {
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(-20, 350, 100, 50)
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
        text.position.set(30,375);
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

    constructor (app, name, rectX, rectY, textX, textY) { 
        this.container = new Container();
        this.app = app; 
        this.textX = textX;
        this.textY = textY;
        this.rectX = rectX;
        this.rectY = rectY;
        this.createChildren(name)
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect(this.rectX, this.rectY)
        )
        this.container.addChild(
            this.generateText(name, this.textX, this.textY)
        )
        this.container.x = 200; 
        this.container.y = 200; 
    } 
    
    generateRect(rectX, rectY){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect((100*totalButtons)+(20*(totalButtons-1)), 350, 100, 50)  // 460, 350
        .endFill();
        console.log(totalButtons);
        
        // Added Event 
        rect.interactive = true;
        rect.buttonMode = true;
        // rect.on("click", createNewGate);

        return rect;
    }

    generateText(name, textX, textY) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set((100*totalButtons)+(20*(totalButtons-1)) + 50, 375);
        return text;
    }
}



function createAndGate () {
    let newAndGates = new GateContainer(app, "AND");
    console.log("New gate created");
}

function createOrGate () {
    let newOrGate = new GateContainer(app, "OR");
    console.log("New gate created");
}

function createNotGate () {
    let newNotGate = new GateContainer(app, "NOT");
    console.log("New gate created");
}


export let chipName;

function create() {
    chipName = prompt("What is the name of this chip??");
    totalButtons = totalButtons + 1; 
    let new_gate = new userSavedButton(app, chipName);
    console.log(totalButtons);
    console.log(chipName);
}


function createInput () {
    let input = new inputCircles.createInputBubble(0);
    console.log("Clicked");
}




