

export class Add_Ticker { 

    constructor(app) { 
        app.ticker.add(delta => this.loop(delta, app));
    }

    loop(delta, app) { 
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.renderer.view.style.position = 'absolute'; 
        
        // Check which elements have been activated or deactivated 
    }
 
}