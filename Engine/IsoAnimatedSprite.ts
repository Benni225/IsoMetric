///<reference path="IsoSprite.ts" />
"use strict";

class IsoAnimatedSprite extends IsoSprite {
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string) {
        super(Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }

    addFrameAnimation(name: string, frames: Array<number>, speed: number, easing: Function = IsoEasing.Linear, type: string = IsoAnimation.ONCE, callbacks: Array<IsoCallback> = new Array()): IsoAnimatedSprite {
        this.Engine.animation.addFrameAnimation(name, this, frames, speed, easing, type, callbacks);
        return this;
    }

    play(name: string): IsoAnimatedSprite {
        this.Engine.animation.play(name, this);
        return this;
    }

    stop(name): IsoAnimatedSprite {
        this.Engine.animation.stop(name, this);
        return this;
    }

    resume(): IsoAnimatedSprite {
        this.Engine.animation.resume(name, this);
        return this;
    }

    pause(): IsoAnimatedSprite {
        this.Engine.animation.pause(name, this);
        return this;
    }
}
