"use strict";
/*
 * IsoMap
 * This class stores a map. A map has the following form:
 * |-------------------X
 * |[
 * |    [[tileNumber, tileHeight], [tileNumber, tileHeight], [tileNumber, tileHeight]],
 * |    [[tileNumber, tileHeight], [tileNumber, tileHeight], [tileNumber, tileHeight]],
 * |    [[tileNumber, tileHeight], [tileNumber, tileHeight], [tileNumber, tileHeight]]
 * |]
 * Y
 * This is a map with the dimension 3x3 tiles. 3 tiles on the x-axis and 3 tiles on the y-axis. Every item can have 
 * to values. one for the tileimage, which means, what tileimmage should be rendered, and the height.
 */
class IsoMap {
    name: string;
    map: Array<Array<Array<number>>>;
    properties: Array<number> = new Array();
    updated: boolean = false;

    constructor(map?: Array<Array<Array<number>>>, name?: string) {
        if (map !== undefined) {
            this.set(map);
        }
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }

    set(map: Array<Array<Array<number>>>): IsoMap {
        this.map = map;
        return this;
    }

    setName(name: string): IsoMap {
        this.name = name;
        return this;
    }

    get(): Array<Array<Array<number>>> {
        return this.map;
    }

    getValue(row: number, column: number): Array<number> {
        return this.map[row][column];
    }

    getPropertiy(property: string, row: number, column: number): number {
        if (this.properties[name] !== undefined) {
            if (this.map[row] !== undefined && this.map[row][column] !== undefined) {
                if (this.map[row][column][this.properties[name]] !== undefined) {
                    return this.map[row][column][this.properties[name]];
                } else {
                    throw ("The property '" + property + "' with index '" + this.properties[name] + "' does not exist in the map.");
                }
            } else {
                throw ("Row " + row + " or Column " + column + " does not exist.");
            }
        } else {
            throw ("Property '" + property + "' does not exist.");
        }
    }

    nameProperty(name: string, valueIndex: number) {
        if (valueIndex > 1) {
            this.properties[name] = valueIndex;
        } else {
            throw ("valueIndex in IsoMap.nameProperty has to be bigger 1.");
        }
    }

    editProperty(name: string, valueIndex: number) {
        if (valueIndex > 1) {
            this.properties[name] = valueIndex;
        } else {
            throw ("valueIndex in IsoMap.nameProperty has to be bigger 1.");
        }
    }

    edit(x: number, y: number, value: Array<number>): IsoMap {
        if (this.map === undefined) {
            this.map = new Array();
        }
        if (this.map[y] === undefined) {
            this.map[y] = new Array();
        }
        this.map[y][x] = value;
        return this;
    }
} 