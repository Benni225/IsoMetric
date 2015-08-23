/// <reference path="../core/IsoObject.ts" />
interface IsoMouseEvent extends MouseEvent {
    wheelDelta?: number;
}

class IsoInput extends IsoObject {
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
    static EVENT_MOUSEWHEEL = "mousewheel";

    Engine: IsoMetric;
    keyCode: number;
    keyEventType: string;
    isKeyEvent: boolean = false;
    keyEvent: KeyboardEvent;
    keyChar: string;
    onKeyboard: Function;

    mouseCode: number;
    mouseEventType: string;
    isMouseEvent: boolean = false;
    mouseEvent: IsoMouseEvent;
    onMouse: Function;
    mouseX: number;
    mouseY: number;
    mouseWheelDelta: number;

    touches: TouchList;
    isTouchEvent: boolean = false;
    touchEvent: TouchEvent;
    touchEventType: string;
    touchStartTime: number;
    touchEndTime: number;

    onTouch: Function;

    onInput: Function;

    oldEvent: Event;

    constructor() {
        super();
        this.Engine = IsoMetric.self;
        IsoMetric.self.canvas.on("load", () => this.addEvents());
    }

    addEvents() {
        var el = IsoMetric.self.canvas.element;
        el.onkeydown = (event: KeyboardEvent) => this.checkKeyboard(event);
        el.onkeypress = (event: KeyboardEvent) => this.checkKeyboard(event);
        el.onkeyup = (event: KeyboardEvent) => this.checkKeyboard(event);
        el.onmousedown = (event: IsoMouseEvent) => this.checkMouse(event);
        el.onmousemove = (event: IsoMouseEvent) => this.checkMouse(event);
        el.onmouseup = (event: IsoMouseEvent) => this.checkMouse(event);
        el.onmousewheel = (event: IsoMouseEvent) => this.checkMouse(event);
        this.log("Added the input events to the main canvas.", IsoLogger.INFO);
    }

    checkKeyboard(event: KeyboardEvent) {
        this.oldEvent = event;
        this.isKeyEvent = true;
        this.keyEventType = event.type;
        this.keyEvent = event;
        this.keyCode = event.which;
        this.keyChar = String.fromCharCode(this.keyCode);
        this.call(event.type, [event]);
    }

    checkMouse(event: IsoMouseEvent) {
        this.oldEvent = event;
        this.isMouseEvent = true;
        this.mouseEvent = event;
        this.mouseEventType = event.type;
        this.mouseCode = event.which;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.mouseWheelDelta = event.wheelDelta || -event.detail;
        this.call(event.type, [event]);
    }

    checkTouch(event: TouchEvent) {
        this.oldEvent = event;
        this.isTouchEvent = true;
        this.touches = event.touches;
        this.touchEventType = event.type;
        this.call(event.type, [event]);
    }

    reset() {
        this.isKeyEvent = false;
        this.isMouseEvent = false;
        this.isTouchEvent = false;
        this.keyChar = "";
        this.keyCode = undefined;
        this.keyEventType = undefined;
        this.mouseCode = 0;
        this.keyEvent = undefined;
        this.mouseEvent = undefined;
        this.mouseEventType = undefined;
        this.mouseWheelDelta = undefined;
        this.touches = undefined;
        this.touchEvent = undefined;
        this.touchEventType = "";
    }
} 