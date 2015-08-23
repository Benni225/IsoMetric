class IsoLogger {
    static ERROR: number = 0;
    static WARN: number = 1;
    static INFO: number = 2;
    static DEBUG: boolean = false;
    lastError: string;
    log(error: Error|string, warnLevel: number) {
        var e = "";
        if (typeof error === "Error") {
            e = error.message;
        } else if(typeof error === "string"){
            e = error;
        }
        if (this.lastError === undefined || this.lastError !== e) {
            switch (warnLevel) {
                case IsoLogger.ERROR:
                    this.debug("This object throws an error:");
                    this.debug(this);
                    console.error(error);
                    break;
                case IsoLogger.WARN:
                    console.warn(error);
                    break;
                case IsoLogger.INFO:
                    console.info(error);
                    break;
            }
            this.lastError = e;
        }
    }

    debug(o: any) {
        if (IsoLogger.DEBUG === true) {
            console.debug(o);
        }
    }
}