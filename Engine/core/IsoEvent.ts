///<reference path="IsoLogger.ts" />
class IsoEvent extends IsoLogger {
    __onCallbacks: Array<EventListener> = new Array();
    fire(type: string, data?: any, element?: HTMLElement) {
        try {
            if (CustomEvent !== undefined) {
                var e = new CustomEvent(type);
                e.initCustomEvent(type, true, true, data);
                if (element !== undefined) {
                    element.dispatchEvent(e);
                } else {
                    document.dispatchEvent(e);
                }
            } else if (document.createEvent !== undefined) {
                var oe = document.createEvent("Events");
                oe.initEvent(type, true, true);
                oe["detail"] = data;
                if (element !== undefined) {
                    element.dispatchEvent(oe);
                } else {
                    document.dispatchEvent(oe);
                }
            } else if (document["createEventObject"] !== undefined) {
                var oie = document["createEventObject"]();
                oie.initEvent(type, true, true);
                oie["detail"] = data;
                if (element !== undefined) {
                    element.dispatchEvent(oie);
                } else {
                    document.dispatchEvent(oie);
                }
            } else {
                throw new Error("This browser is not compatible. No events can be fired.");
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }

    bind(eventType: string, callback: EventListener) {
        document.addEventListener(eventType, callback);
    }

    unbind(eventType: string, callback) {
        document.removeEventListener(eventType, callback);
    }

    on(eventType: string, callback: EventListener): IsoEvent {
        this.__onCallbacks[eventType] = callback;
        return this;
    }

    call(eventType, args: Array<any> = new Array()) {
        if (this.__checkOn(eventType))
            this.__onCallbacks[eventType].apply(this, args);
    }

    __checkOn(eventType: string): boolean {
        if (this.__onCallbacks[eventType] !== undefined) {
            return true;
        } else {
            return false;
        }
    }
}
