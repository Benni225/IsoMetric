"use strict";
class IsoInput {
    static KEYDOWN: number = 40;
    static KEYUP: number = 38;
    static KEYLEFT: number = 37;
    static KEYRIGHT: number = 39;
    static KEYTAB: number = 9;
    static KEYESCAPE: number = 27;
    static KEYSPACE: number = 32;
    static KEYENTER: number = 13;
    static KEYCTRL: number = 17;
    static KEYSHIFT: number = 16;
    static KEYALT: number = 18;
    static KEYBACKSPACE: number = 8;

    static EVENT_KEYPRESS = "keypress";
    static EVENT_KEYDOWN = "keydown";
    static EVENT_KEYUP = "keyup";
    static EVENT_MOUSEDOWN = "mousedown";
    static EVENT_MOUSEUP = "mouseup";

    Engine: IsoMetric;
    keyCode: number;
    keyEventType: string;
    isKeyEvent: boolean = false;
    keyEvent: KeyboardEvent;
    keyChar: string;
    onKeyboard: Function;

    lastMouseCode: number;
    lastMouseEventType: string;
    isMouseEvent: boolean = false;
    mouseEvent: MouseEvent;
    onMouse: Function;
    mouseX: number;
    mouseY: number;

    lastTouchEventType: string;
    touches: TouchList;
    isTouchEvent: boolean = false;
    touchEvent: TouchEvent;
    onTouch: Function;

    onInput: Function;

    oldEvent: Event;

    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
        document.addEventListener("IsoCanvasReady", () => this.addEvents());
    }

    addEvents() {
        var el = document;
        el.onkeydown = (event: KeyboardEvent) => this.checkKeyboard(event);
        el.onkeypress = (event: KeyboardEvent) => this.checkKeyboard(event);
        el.onkeyup = (event: KeyboardEvent) => this.checkKeyboard(event);
        el.onmousedown = (event: MouseEvent) => this.checkMouse(event);
        el.onmousemove = (event: MouseEvent) => this.checkMouse(event);
        el.onmouseup = (event: MouseEvent) => this.checkMouse(event);
        el.onmousewheel = (event: MouseEvent) => this.checkMouse(event);
        el.ontouchcancel = (event: TouchEvent) => this.checkTouch(event);
        el.ontouchend = (event: TouchEvent) => this.checkTouch(event);
        el.ontouchmove = (event: TouchEvent) => this.checkTouch(event);
        el.ontouchstart = (event: TouchEvent) => this.checkTouch(event);
    }

    checkKeyboard(event: KeyboardEvent) {
        this.oldEvent = event;
        this.isKeyEvent = true;
        this.keyEventType = event.type;
        this.keyEvent = event;
        this.keyCode = event.which;
        this.keyChar = String.fromCharCode(this.keyCode);
        this.callCallback(event);
    }

    checkMouse(event: MouseEvent) {
        this.oldEvent = event;
        this.isMouseEvent = true;
        this.mouseEvent = event;
        this.lastMouseCode = event.which;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.callCallback(event);
    }

    checkTouch(event: TouchEvent) {
        this.oldEvent = event;
        this.isTouchEvent = true;
        this.touches = event.touches;
        this.lastTouchEventType = event.type;
        this.callCallback(event);
    }

    reset() {
        this.isKeyEvent = false;
        this.isMouseEvent = false;
        this.isTouchEvent = false;
        this.keyChar = "";
        this.keyCode = 0;
        this.keyEventType = undefined;
        this.lastMouseCode = 0;
        this.lastMouseEventType = "";
        this.keyEvent = undefined;
        this.mouseEvent = undefined;
        this.touches = undefined;
        this.touchEvent = undefined;
        this.lastTouchEventType = "";
    }

    callCallback(event: Event) {
        if (this.onInput !== undefined) {
            this.onInput.call(this, this.Engine, event);
        }
        if (event.type.replace("key", "") !== event.type && this.onKeyboard !== undefined) {
            this.onKeyboard.call(this, this.Engine, event);
        }
        if (event.type.replace("mouse", "") !== event.type && this.onMouse !== undefined) {
            this.onMouse.call(this, this.Engine, event);
        }
        if (event.type.replace("key", "") !== event.type && this.onTouch !== undefined) {
            this.onTouch.call(this, this.Engine, event);
        }
    }
} 