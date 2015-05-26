///<reference path="IsoImage.ts" />
class IsoBillboard extends IsoImage {
    x: number;
    y: number;
    scrollX: number;
    scrollY: number;
    offsetX: number;
    offsetY: number;
    speed: number;
    Engine: IsoMetric;
    layer: IsoLayer;
    constructor(Engine: IsoMetric, name?: string, src?: string) {
        super(name, src);
        this.Engine = Engine;
        if (name != undefined && src != undefined) {
            this.create(name, src);
        }
    }

    create(name: string, src: string): IsoBillboard {
        this.name = name;
        this.src = src;
        return this;
    }

    load(): IsoBillboard {
        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = (event: Event) => this._onLoad(event);
        return this;
    }

    _onLoad(event: Event) {
        this.onLoad.call(this, event);
    }

    setPosition(x: number, y: number) : IsoBillboard {
        this.x = x;
        this.y = y;
        return this;
    }

    setSpeed(speed: number): IsoBillboard {
        this.speed = speed;
        return this;
    }

    move(deltaX: number, deltaY: number): IsoBillboard {
        this.x = this.x + (deltaX * this.speed);
        this.y = this.y + (deltaY * this.speed);
        return this;
    }

    setDeltaScroll(deltaX: number, deltaY: number) {
        this.scrollX = this.scrollX + (this.speed * -(deltaX));
        this.scrollY = this.scrollY + (this.speed * (deltaY));
    }

    setScroll(x: number, y: number) {
        this.scrollX = x;
        this.scrollY = y;
    }
}

class IsoBillboards extends IsoCollection {
    collection: Array<IsoBillboard> = new Array();
    private loaded: number = 0;
    private onLoaded: Function;
    private onEvery: Function;
    Layer: IsoLayer;

    constructor(Engine: IsoMetric, Layer: IsoLayer) {
        super(Engine);
        this.Layer = Layer;
    }

    add(name: string, src: string): IsoBillboards {
        this.collection.push(new IsoBillboard(this.Engine, name, src));
        return this;
    }

    load(): IsoBillboards {
        for (var i = 0; i < this.collection.length; i++) {
            this.collection[i].onLoad = (event: Event) => this.loadCounter(event, this.collection[i]);
            this.collection[i].load();
        }
        return this;
    }

    loadCounter(event: Event, tileSet: IsoBillboard) {
        this.loaded = this.loaded + 1;
        if (this.onEvery !== undefined) {
            this.onEvery(this.Engine, event, tileSet);
        }
        if (this.loaded === this.collection.length) {
            new IsoEvent("tilesetsLoaded").trigger();
            this.callThen();
        }
    }

    every(callback: Function): IsoBillboards {
        this.onEvery = callback;
        return this;
    }

    then(callback: Function): IsoBillboards {
        this.onLoaded = callback;
        return this;
    }

    callThen() {
        if (this.onLoaded !== undefined) {
            this.onLoaded.call(this.Engine);
        }
    }
} 