import { Application, Container, Graphics } from '../pixi.mjs'
import { setDraggable } from '../elementBehaviour/dragDropBehaviour.js';
import { Text } from '../pixi.mjs';
import { IObubble } from './IObubble.js';
import { app } from '../app.js';



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

export class GateButtons {

    constructor (app, name, x , y) { 
        this.container = new Container();
        this.app = app; 
        this.x = x;
        this.y = y;
        this.createChildren(name);
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect()
        )
        this.container.addChild(
            this.generateText(name, this.x, this.y)
        )
        this.container.x = 200; 
        this.container.y = 200; 
    }   
    

    generateRect(){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(200, 350, 100, 50)
        .endFill();
        
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on("click", createAndGate);
        return rect;
    }

    generateText(name, x, y) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(x, y);
        return text;
    }

}


export class OrButtons {

    constructor (app, name) { 
        this.container = new Container();
        this.app = app; 
        this.createChildren(name)
        // this.textPosition = textPosition;
    }

    createChildren(name) { 
        this.app.stage.addChild(this.container);
        this.container.addChild(
            this.generateRect()
        )
        this.container.addChild(
            this.generateText(name)
        )
        this.container.x = 800; 
        this.container.y = 600; 
    }   
    

    generateRect(){
        const rect = new Graphics();
        rect.beginFill(0xAA33BB)
        .lineStyle(4, 0x000000, 1)
        .drawRect(100, 350, 100, 50)
        .endFill();
        
        return rect;
    }

    generateText(name) { 
        const text = new Text(name);
        text.anchor.set(0.5, 0.5);
        text.position.set(150,373);
        return text;
    }

}

function createAndGate () {
    let new_and = new GateContainer(app, "AND");
    console.log("New and gate created");
}


