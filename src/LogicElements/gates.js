

export class IONode { 
    constructor(name, inputs, outputs) { 
        this.inputs = inputs;
        this.outputs = outputs; 
        this.active = false;
        this.outputLines = [];
    }
    
    isActive() { 
        throw TypeError(
            "Calling isActive in IONode or unimplemented version in child: " 
            + this.name);
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

    inputDeactivated() { 
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

        }, 200);
    }

    outputInactive(index) { 
        let outputs = this.outputs; 
        let input = this; 
        setTimeout(() => { 
            for (let output of outputs) { 
                output.inputDeactivated(input);
            }
        })
    }

    addInput(input) { 
        this.inputs.push(input);
        input.outputs.push(this);
    }
}

export class ANDOutput extends IONode { 
    constructor(inputs, outputs, name="AND") { 
        super(name, inputs, outputs);
    }

    isActive() { 
        if (this.inputs.length != 2 && this.outputs.length != 1) {
            console.log(this);
            throw ("Incorrect number of nodes in ANDOutput object");
        }
        if (this.inputs[0].isActive() && this.inputs[1].isActive) 
            return true;
        
        return false; 
    }
}

export class OROutput extends IONode { 
    constructor(inputs, outputs, name="AND") { 
        super(name, inputs, outputs);
    }

    isActive() { 
        if (this.inputs.length != 2 && this.outputs.length != 1) {
            console.log(this);
            throw ("Incorrect number of nodes in ANDOutput object");
        }
        if (this.inputs[0].isActive() || this.inputs[1].isActive) 
            return true;
        
        return false; 
    }
}

// TODO: Fix this class
export class NOTOutput extends IONode { 
    constructor(inputs, outputs, name="NOT") { 
        super(name, inputs, outputs);
    }

    isActive() { 
        if (this.inputs.length != 1 && this.outpuoutputstNodes.length != 1) {
            console.log(this);
            throw ("Incorrect number of nodes in NOTOutput object");
        }
        if (this.inputs[0].isActive() && this.inputs[1].isActive) 
            return true;
        
        return false; 
    }
}

export class Input extends IONode { 
    constructor(inputNodes, outputNodes, name="Input") { 
        super(name, inputNodes, outputNodes);
        this.activeInputs = 0; 
    }

    isActive() { 
        if (this.activeInputs > 0) return true; 
        return false; 
    }

    inputActivated() { 
        this.activeInputs++; 
        if (this.activeInputs === 1) { 
            this.active = true; 
            let input = this;
            for (let output of this.outputs) { 
                output.inputActivated(input);
            }
        }
    }

    inputDeactivated() { 
        this.activeInputs--; 
        if (this.activeInputs === 0) { 
            this.active = false; 
            let input = this;
            for (let output of this.outputs) { 
                output.inputDeactivated(input);
            }
        }
    }
}

export class StartingInput { 
    constructor(outputNodes) { 
        this.outputs = outputNodes;
        this.active = false; 
    }

    activate() { 
        this.active = true;
        this.outputActive();
    }

    deactivate() { 
        this.active = false; 
        this.outputInactive();
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
        let outputs = this.outputs; 
        let input = this; 
        setTimeout(() => { 
            for (let output of outputs) { 
                output.inputDeactivated(input);
            }
        })
    }
}

export class ChipOutput extends Input { 

    constructor(inputNodes, outputNodes, name="Output Node") { 
        super(inputNodes, outputNodes, name);
    }
}