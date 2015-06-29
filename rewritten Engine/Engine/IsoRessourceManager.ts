///<reference path="IsoRessource.ts" />
///<reference path="IsoOn.ts" />
"use strict";

class IsoRessourceManager {
    ressources: Array<IsoRessource> = new Array();
    Engine: IsoMetric;
    private numberAutoload: number = 0;
    private autoloaded: number = 0;
    __onProgress: Function;
    __onProgressAll: Function;
    __then: Function;
    __beforeLoad: Function;

    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    add(name: string, src: string, type: string, autoload: boolean = true) {
        this.ressources.push(new IsoRessource(name, src, type, autoload));
        this.ressources[this.ressources.length - 1].onLoad((e: Event) => this._onProgress(e));
        if (autoload === true) {
            this.numberAutoload++;
        }
    }

    onBeforeLoad(callback: Function) {
        this.__beforeLoad = callback;
    }

    _onBeforeLoad() {
        if (typeof this.__beforeLoad === "function") {
            this.__beforeLoad.call(this);
        }
    }

    get(name: string) {
        for (var i = 0; i < this.ressources.length; i++) {
            if (this.ressources[i].name === name) {
                return this.ressources[i];
            }
        }
    }

    load(): IsoRessourceManager {
        for (var i = 0; i < this.ressources.length; i++) {
            this.ressources[i].load();
        }
        return this;
    }

    onProgress(callback: Function) {
        this.__onProgress = callback;
    }

    _onProgress(event: Event): IsoRessourceManager {
        this.autoloaded++;
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS);
        e.trigger();

        if (typeof this.__onProgress === "function") {
            this.__onProgress.call(this, event);
        }
        if (this.autoloaded === this.numberAutoload) {
            this._onProgressAll();
        }
        return this;
    }

    _then() {
        if (typeof this.__then === "function") {
            this.__then.call(this.Engine);
        }
    }

    then(callback: Function): IsoRessourceManager {
        this.__then = callback;
        return this;
    }

    _onProgressAll() {
       var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS_ALL);
        e.trigger();

        if (typeof this.__onProgressAll === "function") {
            this.__onProgressAll.call(this, event);
        }

        this._then();
    }

    onProgressAll(callback: Function) {
        this.__onProgressAll = callback;
    }
} 