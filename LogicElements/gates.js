

export class IONode { 
    constructor(name, inputs, outputs) { 
        this.inputs = [];
        this.outputs = []; 
        this.active = false;
        this.outputLines = [];
    }
    
    isActive() { 
        throw TypeError(
            "Calling isActive in IONode or unimplemented version in child: " 
            + this.name);
        return undefined;
    }

    inputActivated() { 
        // computes state relative to active state - trigger cascade if changed
        let activity = this.isActive();
        if (activity !== this.active) { 
            // set current activity of output node
            this.active = activity
            // trigger event
            if (this.active) 
                this.outputActive();
            else
                this.outputInactive();
        } 
    }

    outputActive() { 
        let outputs = this.outputs;
        let input = this;
        setTimeout(() => { 
            for (let output of outputs) { 
                output.inputActivated(input);
            } 

        }, 200)
    }

    outputInactive(index) { 
        this.inputs[index] --
    }

    
}

export class ANDOutput extends IONode { 
    constructor(name="AND", inputNodes, outputNodes) { 
        super(name, inputNodes, outputNodes);
    }

    isActive() { 
        if (this.inputNodes.length != 2 && this.outputNodes.length != 1) {
            console.log(this);
            throw ("Incorrect number of nodes in ANDOutput object");
        }
        if (this.inputs[0].isActive() && this.inputs[1].isActive) 
            return true;
        
        return false; 
    }
}

export class OROutput extends IONode { 
    constructor(name="AND", inputNodes, outputNodes) { 
        super(name, inputNodes, outputNodes);
    }

    isActive() { 
        if (this.inputNodes.length != 2 && this.outputNodes.length != 1) {
            console.log(this);
            throw ("Incorrect number of nodes in ANDOutput object");
        }
        if (this.inputs[0].isActive() && this.inputs[1].isActive) 
            return true;
        
        return false; 
    }
}

export class NOTOutput extends IONode { 
    constructor(name="NOT", inputNodes, outputNodes) { 
        super(name, inputNodes, outputNodes);
    }

    isActive() { 
        if (this.inputNodes.length != 1 && this.outputNodes.length != 1) {
            console.log(this);
            throw ("Incorrect number of nodes in NOTOutput object");
        }
        if (this.inputs[0].isActive() && this.inputs[1].isActive) 
            return true;
        
        return false; 
    }
}

export class Input extends IONode { 
    constructor(name="Input", inputNodes, outputNodes) { 
        super(name, inputNodes, outputNodes);
    }

    isActive() { 
        if (this.active) return true; 
        return false; 
    }

    inputActivated() { 
        for (let input in this.inputNodes) { 
            if (input.isActive()) { 
                
            }
        }
    }

    hasActive() { 

    }
     
}
