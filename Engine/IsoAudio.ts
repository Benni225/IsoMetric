///<reference path="IsoOn.ts" />
"use strict";

class IsoAudio extends IsoOn implements IIsoResource {
    type: string = IsoRessource.AUDIO;
    audio: HTMLAudioElement;
    src: string = "";
    isLoaded: boolean = false;
    constructor(src: string) {
        super();
        this.create(src);
    }

    create(src: string) {
        this.src = src;
    }

    load() {
        this.audio = document.createElement("audio");
        this.audio.addEventListener("canplaythrough", (event: Event) => this._onLoad(event), false);
        this.audio.src = this.src;
    }

    /**
     * Called when the image file was loaded.
     */
    _onLoad(event: Event) {
        this.isLoaded = true;
        this.callOn("load");
    }
    get(): HTMLAudioElement {
        return this.audio;
    }
}