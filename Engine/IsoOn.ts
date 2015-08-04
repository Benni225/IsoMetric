class IsoOn {
    onCallbacks: Array<Function> = new Array();
    fire(type: string, data?: any, element?: HTMLElement) {
        var e = new CustomEvent(type);
        e.initCustomEvent(type, true, true, data);

        if (element !== undefined) {
            element.dispatchEvent(e);
        } else {
            document.dispatchEvent(e);
        }
    }

    onEvent(eventType: string, callback: EventListener) {
        document.addEventListener(eventType, callback);
    }

    unbindEvent(eventType: string, callback) {
        document.removeEventListener(eventType, callback);
    }

    on(eventType: string, callback: Function): IsoOn {
        this.onCallbacks[eventType] = callback;
        return this;
    }

    callOn(eventType: string) {
        if (this.checkOn(eventType))
            this.onCallbacks[eventType].call(this);
    }

    checkOn(eventType: string): boolean {
        if (this.onCallbacks[eventType] !== undefined) {
            return true;
        } else {
            return false;
        }
    }
}
