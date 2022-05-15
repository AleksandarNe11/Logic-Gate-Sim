import { utils } from '../../pixi.mjs';

export class EmitterSingleton { 

    // instantiates singleton if not yet created or returns singleton instance
    constructor() {
        if (typeof window.EventHandler !== 'undefined') 
            return window.EventHandler
        this.eventEmitter = new utils.EventEmitter();
        window.EventHandler = this;
    }

    getEmitter() { 
        return this.eventEmitter;
    }
}