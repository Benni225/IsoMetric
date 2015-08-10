///<reference path="IsoObject.ts" />
///<reference path="IsoTileObject.ts" />
///<reference path="IsoSprite.ts" />
///<reference path="IsoTileMap.ts" />
"use strict";
class IsoLayer {
    /** Includes all objects like IsoObject, IsoText, IsoSprite, IsoAnimatedSprite. */
    objects: Array<any> = new Array();
    texts: Array<IsoText> = new Array();
    /** Include the tiled map of a layer. */
    tileMap: IsoTileMap;
    /** Includes all billboards of  a layer. */
    billboards: Array<IsoBillboard> = new Array(); // isoBillboards
    /** Name of the layer. */
    name: string;
    /** The index of the layer. */
    index: number;
    /** An instance of IsoMetric. */
    Engine: IsoMetric;
    /** Controls if the layer is hidden or not. */
    hidden: boolean = false;
    /** Creates a new layer. */
    constructor(Engine: IsoMetric, index: number, name?: string) {
        this.Engine = Engine;
        this.index = index;
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    /** Adds a new object to the layer */
    addObject(name: string, image: IsoRessource): IsoObject {
        var o = new IsoObject(this.Engine, image, name);
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].free === true) {
                this.objects[i] = null;
                this.objects[i] = o;
                return o;
            }
        }
        this.objects.push(o);
        return o;
    }
    /** Adds a new sprite to the layer. */
    addSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoSprite {
        var s = new IsoSprite(this.Engine, image, tileObjectInfo, name);
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].free === true) {
                this.objects[i] = null;
                this.objects[i] = s;
                return s;
            }
        }
        this.objects.push(s);
        return s;
    }
    /** Adds a new text to the layer. */
    addText(name: string, text: string): IsoText {
        var t = new IsoText(this.Engine, name, text);
        for (var i = 0; i < this.texts.length; i++) {
            if (this.texts[i].free === true) {
                this.texts[i] = null;
                this.texts[i] = t;
                return t;
            }
        }
        this.texts.push(t);
        return t;
    }
    /** Adds a new billboard to the layer. */
    addBillboard(name: string, image: IsoRessource): IsoBillboard {
        var b = new IsoBillboard(this.Engine, image, name);
        for (var i = 0; i < this.billboards.length; i++) {
            if (this.billboards[i].free === true) {
                this.billboards[i] = null;
                this.billboards[i] = b;
                return b;
            }
        }
        this.billboards.push(b);
        return b;
    }
    /** Adds a new particle emitter. */
    addEmitter(name: string, ressource: IsoRessource) {
        var e = new IsoEmitter(this.Engine, ressource);
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].free === true) {
                this.objects[i] = null;
                this.objects[i] = e;
                return e;
            }
        }
        this.objects.push(e);
        return e;
    }
    /** Adds a new animated sprite to the layer. */
    addAnimatedSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoAnimatedSprite {
        var s = new IsoAnimatedSprite(this.Engine, image, tileObjectInfo, name);
        this.objects.push(s);
        return s;
    }
    /** Adds a new tilemap to the layer. */
    addTileMap(name: string, image: IsoRessource, tileWidth: number, tileHeight: number, map?: Array<Array<Array<number>>>): IsoTileMap {
        this.tileMap = new IsoTileMap(this.Engine, name, tileWidth, tileHeight, image, map);
        return this.tileMap;
    }
    /** Sets the name of the layer. */
    setName(name: string): IsoLayer {
        this.name = name;
        return this;
    }
    /** Gets a billboard by its name. */
    getBillboard(name: string): IsoBillboard {
        for (var i = 0; i < this.billboards.length; i++) {
            if (this.billboards[i].name === name) {
                return this.billboards[i];
            }
        }
        return undefined;
    }
    /** Gets a object by its name. */
    getObject(name: string): IsoObject|IsoSprite|IsoAnimatedSprite|IsoText {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === name) {
                return this.objects[i];
            }
        }
        return undefined;
    }
    /** Equal to IsoLayer.getObject. */
    getSprite(name: string): IsoObject|IsoSprite|IsoAnimatedSprite|IsoText {
        return this.getObject(name);
    }
    /** Equal to IsoLayer.getObject. */
    getAnimatedSprite(name: string): IsoObject|IsoSprite|IsoAnimatedSprite|IsoText {
        return this.getObject(name);
    }
    /** Equal to IsoLayer.getObject. */
    getText(name: string): IsoText {
        for (var i = 0; i < this.texts.length; i++) {
            if (this.texts[i].name === name) {
                return this.texts[i];
            }
        }
        return undefined;
    }
    /** Gets the tilemap of the layer. */
    getTileMap(): IsoTileMap {
        return this.tileMap;
    }
    /** Zoom all objects, tilemap and billboards of the layer. */
    zoom(zoom: number) {
        if (this.tileMap !== undefined) {
            this.tileMap.zoom(zoom);
        }
        this.tileMap.update();

        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].zoom(zoom);
        }

        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].zoom(zoom);
        }
    }
    /** Scrolls all objects, tilemap and billboards of the layer. */
    scroll(deltaX: number, deltaY: number) {
        if (this.tileMap !== undefined) {
            this.tileMap.scroll(deltaX, deltaY);
        }
    }
    /** Rotates all objects, tilemap and billboards of the layer. */
    rotate(degrees: number) {

        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].rotate(degrees);
        }

        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].rotate(degrees);
        }
    }
    /** Sets the zooming point of all objects, tilemap and billboards of the layer. */
    setZoomPoint(point: IsoPoint) {
        if (this.tileMap !== undefined) {
            this.tileMap.setZoomPoint(point);
        }

        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].zoomPoint.set(point.x, point.y);
        }

        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].zoomPoint.set(point.x, point.y);
        }
    }
    /** Sets the speed of all objects, tilemap and billboards of the layer. */
    setSpeed(speed: number) {
        if (this.tileMap !== undefined) {
            this.tileMap.setSpeed(speed);
        }

        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].setSpeed(speed);
        }

        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].setSpeed(speed);
        }
    }
    /** Hides the layer. */
    hide(): IsoLayer {
        this.hidden = true;
        return this;
    }
    /** Show the layer. */
    show(): IsoLayer {
        this.hidden = false;
        return this;
    }
    /** Return true if the layer is hidden. Else false. */
    isHidden(): boolean {
        return this.hidden;
    }
    /** Removes an object or sprite from the layer. */
    freeObject(object: IsoMinimalObject) {
        object.hidden = true;
        object.free = true;
    }
    /** Removes an object from the layer. */
    freeText(text: IsoText) {
        text.free = true;
        text.hidden = true;
    }
    /** Removes a billboard from the layer. */
    freeBillboard(billboard: IsoBillboard) {
        billboard.free = true;
        billboard.hidden = true;
    }
    /** Removes the tilemap form the layer.*/
    freeTileMap() {
        if (this.tileMap !== undefined && this.tileMap !== null) {
            this.tileMap = null;
        }
    }
} 