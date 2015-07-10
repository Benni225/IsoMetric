"use strict";

class IsoBillboard extends IsoObject {
    static REPEATX: string = "repeatx";
    static REPEATY: string = "repeaty";
    static REPEAT: string = "repeat";
    static NOREPEAT: string = "norepeat";

    repeat: string = IsoBillboard.NOREPEAT;
    /** Sets if the billboard will repeated. */
    setRepeat(repeat: string): IsoBillboard {
        this.repeat = repeat;
        return this;
    }

}