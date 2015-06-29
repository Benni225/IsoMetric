///<reference path="IsoImage.ts" />
///<reference path="IsoOn.ts" />
"use strict";
class IsoRessource {
    static AUDIO = "audio";
    static IMAGE = "image";

    static ISO_EVENT_RESSOURCE_LOADED = "ISO_EVENT_RESSOURCE_LOADED";
    static ISO_EVENT_RESSOURCE_PROGRESS = "ISO_EVENT_RESSOURCE_PROGRESS";
    static ISO_EVENT_RESSOURCE_PROGRESS_ALL = "ISO_EVENT_RESSOURCE_PROGRESS_ALL";

    name: string;
    src: string;
    type: string;
    autoload: boolean;
    loaded: boolean = false;

    htmlAudio: HTMLAudioElement;
    image: IsoImage;

    _on: Array<IsoCallback> = new Array();
    __onLoad: Function;

    constructor(name: string, src: string, type: string, autoload: boolean = true) {
        return this.create(name, src, type, autoload);
    }

    create(name: string, src: string, type: string, autoload: boolean): IsoRessource {
        this.name = name;
        this.src = src;
        this.type = type;
        this.autoload = autoload;
        return this;
    }
    /**
     * @TO DO
     * Implement audio ressources
     */
    load() {
        if (this.type === IsoRessource.IMAGE) {
            this.image = new IsoImage(this.name, this.src);
            this.image.onLoad((e: Event) => this._onLoad(e));
            this.image.load();

        } else if (this.type === IsoRessource.AUDIO) {
            this.htmlAudio = new HTMLAudioElement;

            this.htmlAudio.addEventListener("load", (e: Event) => this._onLoad(e));
            this.htmlAudio.src = this.src;
        }
    }

    _onLoad(event: Event) {

        this.loaded = true;
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS);
        e.trigger();
        if (typeof this.__onLoad === "function") {
            this.__onLoad.call(this, event);
        }
    }

    onLoad(callback: Function) {
        this.__onLoad = callback;
    }

    get(): any {
        if (this.type === IsoRessource.AUDIO) {
            return this.htmlAudio;
        } else if (this.type === IsoRessource.IMAGE) {
            return this.image.get();
        }
    }
} 