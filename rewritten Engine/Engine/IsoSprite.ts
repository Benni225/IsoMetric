///<reference path="IsoTile" />
///<reference path="IsoTileMap" />
"use strict";
interface IsoCollisionBody {
    x: number;
    y: number;
    width: number;
    height: number;
}

class IsoSprite extends IsoTileObject {
    Engine: IsoMetric;
    direction: number;
    collisionBody: IsoCollisionBody;

    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string) {
        super(image, tileInfo);
        this.Engine = Engine;
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }

    getCollidingTiles(tilemap: IsoTileMap): Array<IsoTile> {
        var collisionBody: IsoCollisionBody = this.collisionBody;
        if (collisionBody === undefined) {
            collisionBody = {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            };
        }

        return tilemap.getTilesInRadius(
                this.position.x + collisionBody.x,
                this.position.y + collisionBody.y,
                collisionBody.width,
                collisionBody.height
            );
    }

    getTileImage(): IsoTileImage {
        var x = this.tileOffset.x;
        var y = this.tileOffset.y;
        var width = this.tileSize.width;
        var height = this.tileSize.height + this.tileHeight;

        return {
            x: x,
            y: y,
            width: width,
            height: height,
            image: this.image.image.get()
        };
    }

    setDirection(direction: number): IsoSprite {
        this.direction = direction;
        return this;
    }

    setTile(tile: number): IsoSprite {
        this.tile = tile + this.direction + this.startTile;
        this.tileOffset.x =
            (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.image.image.offset.x);
        this.tileOffset.y =
            (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.image.image.offset.y);
        return this;
    }
}