///<reference path="IsoSprite.ts" />

"use strict";
class IsoAnimatedSprite extends IsoSprite {
    stripeLength: number = 1;

    animations: Array<any>;

    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string) {
        super(Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }

    setStripeLength(stripeLength: number): IsoAnimatedSprite {
        this.stripeLength = stripeLength;
        return this;
    }

    setTile(tile: number): IsoAnimatedSprite {
        this.tile = tile + this.direction * this.stripeLength + this.startTile;
        this.tileOffset.x =
            (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.image.image.offset.x);
        this.tileOffset.y =
            (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.image.image.offset.y);
        return this;
    }
}
