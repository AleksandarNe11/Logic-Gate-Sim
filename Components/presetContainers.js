import { Application, Container, Graphics } from '../pixi.mjs'
import { setDraggable } from '../elementBehaviour/dragDropBehaviour.js';
import { Text } from '../pixi.mjs';
import { IObubble } from './IObubble.js';

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


