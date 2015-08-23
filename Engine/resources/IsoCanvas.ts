///<reference path="../core/IsoObject.ts" />
class IsoCanvas extends IsoObject {
    /** The canvas HTML element. */
    private _element;
    set element(value: HTMLCanvasElement) {
        this.__propertyChanged("element", value);
        this._element = value;
    }
    get element() {
        return this._element;
    }
    src: string 
    /** The context for drawing. */
    private _context;
    set context(value: CanvasRenderingContext2D) {
        this.__propertyChanged("context", value);
        this._context = value;
    }
    get context() {
        return this._context;
    }
    /** The size of the canvas. */
    size: IsoSize = new IsoSize(0, 0);
    private _autoResize: boolean;
    set autoResize(value: boolean) {
        this.__propertyChanged("autoResize", value);
        this._autoResize = value;
    }
    get autoResize() {
        return this._autoResize;
    }

    _fullscreen: boolean;
    set fullscreen(value: boolean) {
        this.__propertyChanged("fullscreen", value);
        this._fullscreen = value;
    }
    get fullscreen() {
        return this._fullscreen;
    }
    set type(value) { }
    get type() {
        return "IsoCanvas";
    }
    constructor(width: number, height: number, fullscreen: boolean = false, autoResize: boolean = true) {
        super();
        this.size = new IsoSize(width, height);
        this.autoResize = autoResize;
        this.fullscreen = fullscreen;
    }
    /** Creates a new canvas element. */
    load() {
        this.element = document.createElement("canvas");
        this.element.width = this.size.width;
        this.element.height = this.size.height;
        if (this.fullscreen === true) {
            this.element.width = window.innerWidth;
            this.element.height = window.innerHeight;
        }
        this.context = this.element.getContext("2d");
        window.onresize = () => this.resize();
        this.fire("load", {}, this.element);
        this.call("load", [this]);
    }
    /** Appends the canvas element to a given HTML element. */
    append(element: Element): IsoCanvas {
        element.appendChild(this.element);
        return this;
    }
    /** Remove the canvas element from a given HTML element. */
    remove(element: HTMLElement): IsoCanvas {
        element.removeChild(this.element);
        return this;
    }
    /** Resize the canvas in case of fullscreen and autoResize is true. */
    resize() {
        if (this.autoResize === true && this.fullscreen === true) {
            this.element.width = window.innerWidth;
            this.element.height = window.innerHeight;
        }
    }
    /** Refreshes the canvas size. */
    refresh() {
        this.element.width = this.size.width;
        this.element.height = this.size.height;
    }
    /** Clears the canvas. */
    clear() {
        try {
            if (this.context !== undefined) {
                this.context.clearRect(0, 0, this.element.width, this.element.height);
            } else {
                this.log(new Error("I could not clear the canvas, because its context was undefined."), IsoLogger.WARN);
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /**  Returns the image. */
    get(): HTMLCanvasElement {
        return this.element;
    }
    /** Gets the width of the image. */
    getWidth(): number {
        return this.size.width;
    }
    /** Gets the height of the image. */
    getHeight(): number {
        return this.size.height;
    }
    /** Returns the size. */
    getSize(): IsoSize {
        return this.size;
    }
    /** Sets the width of the image. */
    setWidth(width: number): IsoCanvas {
        this.size.width = width;
        return this;
    }
    /** Sets the height of the image. */
    setHeight(height: number): IsoCanvas {
        this.size.height = height;
        return this;
    }
    /** Sets the size of the image. */
    setSize(size: IsoSize): IsoCanvas {
        this.size = size;
        return this;
    }
}