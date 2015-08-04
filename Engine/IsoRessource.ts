///<reference path="IsoImage.ts" />
///<reference path="IsoOn.ts" />
"use strict";
interface IIsoResource {
    type: string;
    load();
    get(): any;
};

class IsoRessource extends IsoOn {
    static ISO_EVENT_RESSOURCE_LOADED = "ISO_EVENT_RESSOURCE_LOADED";
    static ISO_EVENT_RESSOURCE_PROGRESS = "ISO_EVENT_RESSOURCE_PROGRESS";
    static ISO_EVENT_RESSOURCE_PROGRESS_ALL = "ISO_EVENT_RESSOURCE_PROGRESS_ALL";
    static IMAGE: string = "image";
    static AUDIO: string = "audio";
    static SHAPE: string = "SHAPE";

    ressource: IsoImage;

    name: string;
    type: string;
    loaded: boolean = false;

    constructor(name: string, ressource: IsoImage|any) {
        super();
        this.name = name;
        this.ressource = ressource;
        this.type = this.ressource.type;
    }

    load() {
        this.ressource.on("load", () => this.onload());
        this.ressource.load();
    }

    onload() {
        this.loaded = true;
        this.fire(IsoRessource.ISO_EVENT_RESSOURCE_LOADED, this);
    }

    get() {
        return this.ressource.get();
    }
} 