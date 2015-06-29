"use strict";
class IsoEvent {
    type: string;
    data: any;
    constructor(type: string){
        this.type = type;
        return this;
    }

    addData(data: any) {
        this.data = data;
        return this;
    }

    trigger(target?: string|HTMLElement) {
        var event = new CustomEvent(this.type);
        event.initCustomEvent(this.type, false, false, this.data);
        if (target !== undefined) {
            if (typeof target === "string") {
                document.querySelector(target).dispatchEvent(event);
            } else {
                target.dispatchEvent(event);
            }
                
        } else {
            document.dispatchEvent(event);
        }
    }
} 