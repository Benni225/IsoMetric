"use strict";
/**
 * Collects all information about a tilemap. For example the scrolling, the used tileset and so on.
 */
class IsoTileMap {
    /**
     * The width of one tile
     */
    tileSizeX: number;
    /**
     * The height of one tile
     */
    tileSizeY: number;
    /**
     * The tileset for the tilemap
     */
    tileSet: IsoTileSet;
    /**
     * The map including the information which tiles is drawn on a specified position
     */
    map: IsoMap;
    /**
     * The height map
     */
    heightMap: IsoHeightMap;
    /**
     * Specifies which tile is drawn in case the the height of an tile is > 0
     */
    heightTile: number;
    /**
     * Scroll on the X-axis
     */
    scrollX: number = 0;
    /**
     * Scroll on the Y-axis
     */
    scrollY: number = 0;
    /**
     * The scrolling speed
     */
    scrollSpeed: number = 1;
    /**
     * The height of the tilemap
     */
    height: number;
    /**
     * The width of the tilemap
     */
    width: number;
    /**
     * The offset on the X-axis
     */
    offsetX: number = 0;
    /**
     * The offset on the Y-axis
     */
    offsetY: number = 0;
    /**
     * An instance of IsoMetric
     */
    Engine: IsoMetric;
    /**
     * Initializes the new tilemap. 
     * @param Engine A instance of IsoMetric
     * @param width (optional) The width of the new tilemap in pixel
     * @param height (optional) The height of the tilemap in pixel
     * @param tileSizeX (optional) The width of a single tile
     * @param tileSizeY (optional) The height of a single tile
     */
    constructor(Engine: IsoMetric, width?: number, height?: number, tileSizeX?: number, tileSizeY?: number) {
        this.Engine = Engine;
        if (width !== undefined && height !== undefined && tileSizeX !== undefined && tileSizeY !== undefined) {
            this.create(width, height, tileSizeX, tileSizeY);
        }
    }
    /**
     * Creates the new tilemap. 
     * @param width The width of the new tilemap in pixel
     * @param height The height of the tilemap in pixel
     * @param tileSizeX The width of a single tile
     * @param tileSizeY The height of a single tile
     * @return The new tilemap
     */
    create(width: number, height: number, tileSizeX: number, tileSizeY: number): IsoTileMap {
        this.width = width;
        this.height = height;
        this.tileSizeX = tileSizeX;
        this.tileSizeY = tileSizeY;
        this.map = new IsoMap(this);
        this.heightMap = new IsoHeightMap(this);
        return this;
    }
    /**
     * Sets the tileset for the tilemap. A tileset is an image which includes all imagedata of a tilemap.
     * @param tileset A instance of the tileset
     * @return The tilemap
     * @see IsoTileSet
     */
    setTileSet(tileSet: IsoTileSet): IsoTileMap {
        this.tileSet = tileSet;
        this.tileSet.setTileSize(this.tileSizeX, this.tileSizeY);
        return this;
    }
    /**
     * Returns the tileset of a tilemap
     * @return The instance of the tileset
     */
    getTileSet(): IsoTileSet {
        return this.tileSet;
    }
    /**
     * Adds the value of x and y to the actual srollvalues
     * @param x Scroll on the X-axis in pixel
     * @param y Scroll on the Y-axis in pixel
     */
    setDeltaScroll(x: number, y: number) {
        this.scrollX = this.scrollX + (this.scrollSpeed * -(x));
        this.scrollY = this.scrollY + (this.scrollSpeed * (y));
        if (this.scrollX > 0) {
            this.scrollX = 0;
        }
        if (this.scrollY > 0) {
            this.scrollY = 0;
        }
        if (-(this.scrollX) + this.Engine.config.get("windowOptions").width + this.offsetX > (this.width - (this.width % this.tileSizeX))) {
            this.scrollX =
            -((this.width - (this.width % this.tileSizeX)) + this.offsetX - this.Engine.config.get("windowOptions").width);
        }
        if (
            -(this.scrollY) + this.Engine.config.get("windowOptions").height + this.offsetY > (this.height - (this.height % this.tileSizeY))
            ) {
            this.scrollY =
            -((this.height - (this.height % this.tileSizeY)) + this.offsetY - this.Engine.config.get("windowOptions").height);
        }
    }
    /**
     * Sets the scrolling speed
     * @param speed The speed
     * @return The tilemap
     */
    setScrollSpeed(speed: number): IsoTileMap {
        this.scrollSpeed = speed;
        return this;
    }
    /**
     * Checks the tile which the mouse pointer is touching
     * return The tile.
     */
    mouseOver(): ITile {
        var mouseX = this.Engine.input.mouseX,
            mouseY = this.Engine.input.mouseY;
        if (
            mouseX > this.width ||
            mouseY > this.height ||
            typeof mouseX === "NaN" ||
            typeof mouseY === "NaN" ||
            mouseX === undefined ||
            mouseY === undefined
            ) {
            return null;
        } else {
            mouseX = mouseX - this.offsetX;
            mouseY = mouseY - this.offsetY;
            if (mouseY > 0 && mouseX > 0) {
                var row = Math.floor((mouseY + (-this.scrollY)) / this.tileSizeY),
                    column = Math.floor((mouseX + (-this.scrollX)) / this.tileSizeX),
                    x = Math.floor(column * this.tileSizeX) + this.scrollX + this.offsetX,
                    y = Math.floor(row * this.tileSizeY) + this.scrollY + this.offsetY;
                return {
                    x: x,
                    y: y,
                    width: this.tileSizeX,
                    height: this.tileSizeY,
                    tile: this.map.get()[row][column]
                };
            } else {
                return null;
            }
        }
    }
    /**
     * Gets all tiles in specified area
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @retrurn An array with information of all tiles
     */
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<ITile> {
        x = x - this.offsetX;
        y = y - this.offsetY;
        var tiles = new Array(),
            toX = x + width,
            toY = y + height,
            rowStart = (y - (y % this.tileSizeY)) / this.tileSizeY,
            rowEnd = (toY - (toY % this.tileSizeY)) / this.tileSizeY,
            colStart = (x - (x % this.tileSizeX)) / this.tileSizeX,
            colEnd = (toX - (toX % this.tileSizeX)) / this.tileSizeX;

        for (var iy = rowStart; iy <= rowEnd; iy++) {
            for (var ix = colStart; ix <= colEnd; ix++) {
                var tileX = ix * this.tileSizeX,
                    tileY = iy * this.tileSizeY,
                    tileX2 = tileX + this.tileSizeX,
                    tileY2 = tileY + this.tileSizeY;
                tiles.push({
                    x: ix * this.tileSizeX,
                    y: iy * this.tileSizeY,
                    width: this.tileSizeX,
                    height: this.tileSizeY,
                    tile: this.map.get()[iy][ix],
                    tileHeight: this.heightMap.getHeight(ix, iy)
                });
            }
        }
        return tiles;
    }
} 