import { DisplayObject, InteractionEvent } from "../../pixi.mjs";
import { EmitterSingleton } from "../EventHandler/EmitterSingleton.js";
import { Point } from "../../pixi.mjs";

function setDraggable(object, app) { 
    object.interactive = true; 
    object.buttonMode = true; 

    let eventEmitter = new EmitterSingleton().getEmitter();
    let onIO = false; 
    eventEmitter
        .on('hover-input', () => {onIO = true})
        .on('unhover-input', () => {onIO = false})
        .on('hover-output', () => {onIO = true})
        .on('unhover-output', () => {onIO = false})

    object
        .on('pointerdown', (event) => onDragStart(event, onIO))
        .on('pointerup', (event) => onDragEnd(event, app))
        .on('pointerupoutside', (event) => onDragEnd(event, app))
        .on('pointermove', (event) => onDragMove(event, app));
}

function onDragStart(intEvent, onIO) { 
    if (!onIO) {
        const obj = intEvent.currentTarget;
    

        obj.dragData = intEvent.data; 
        obj.dragging = 1; 
        obj.dragPointerStart = intEvent.data.getLocalPosition(obj.parent)
        obj.dragObjStart = new Point()
        obj.dragObjStart.copyFrom(obj.position)
        obj.dragGlobalStart = new Point()
        obj.dragGlobalStart.copyFrom(intEvent.data.global)
    }
}

function onDragEnd(intEvent, app) {
    const obj = intEvent.currentTarget
    if (!obj.dragging) return
  
    snap(obj, app)
  
    obj.dragging = 0
    // set the interaction data to null
    // obj.dragData = null
}

function onDragMove(intEvent, app) {
    const obj = intEvent.currentTarget
    if (!obj.dragging) return
    const data = obj.dragData // it can be different pointer!
    if (obj.dragging === 1) {
      // click or drag?
      if (
        Math.abs(data.global.x - obj.dragGlobalStart.x) +
          Math.abs(data.global.y - obj.dragGlobalStart.y) >=
        3
      ) {
        // DRAG
        obj.dragging = 2
      }
    }
    if (obj.dragging === 2) {
      const dragPointerEnd = data.getLocalPosition(obj.parent)
      // DRAG
      obj.position.set(
        obj.dragObjStart.x + (dragPointerEnd.x - obj.dragPointerStart.x),
        obj.dragObjStart.y + (dragPointerEnd.y - obj.dragPointerStart.y)
      )
    }
}

function snap(obj, app) {
    obj.position.x = Math.min(Math.max(obj.position.x, 0), app.screen.width)
    obj.position.y = Math.min(Math.max(obj.position.y, 0), app.screen.height)
}

export {setDraggable}