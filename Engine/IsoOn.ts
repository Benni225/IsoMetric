"use strict";

class IsoOn {
    on(eventType: string, callback: EventListener) {
        document.addEventListener(eventType, callback);
    }
}
