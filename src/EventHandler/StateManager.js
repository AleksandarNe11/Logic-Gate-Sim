export class State { 
    state = {
        "gates": [
            // { }
        ], 
        "connections": {
            // outputNode: [...inputs]
        }
    }

    addGate(type, inputNodes, outputNodes, connections, behaviour) { 
        let new_gate = {
            "type": type, 
            "inputNodes": inputNodes, 
            "outputNodes": outputNodes, 
        }
        this.state.gates.push(new_gate); 
        this.state.connections = connections()
    }
}

let state = new State();