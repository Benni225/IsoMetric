///<reference path="IsoSprite.ts" />
"use strict";

interface IsoAnimation {
    name: string;
    frames: Array<IsoFrame>;
    speed: number;
}
class IsoAnimatedSprite extends IsoSprite {
    animations: Array<IsoAnimation>;

    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string) {
        super(Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    
    addAnimation(name: string, frames: Array<IsoFrame>, speed: number): IsoAnimatedSprite {
        if (this.animations === undefined) {
            this.animations = new Array();
        }

        this.animations.push({
            name: name,
            frames: frames,
            speed: speed
        });

        return this;
    }
}
