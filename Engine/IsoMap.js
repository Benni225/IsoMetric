"use strict";
var IsoMap = (function () {
    function IsoMap(map, name) {
        this.properties = new Array();
        this.updated = false;
        if (map !== undefined) {
            this.set(map);
        }
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoMap.prototype.set = function (map) {
        this.map = map;
        return this;
    };
    IsoMap.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    IsoMap.prototype.get = function () {
        return this.map;
    };
    IsoMap.prototype.getValue = function (row, column) {
        return this.map[row][column];
    };
    IsoMap.prototype.getPropertiy = function (property, row, column) {
        if (this.properties[name] !== undefined) {
            if (this.map[row] !== undefined && this.map[row][column] !== undefined) {
                if (this.map[row][column][this.properties[name]] !== undefined) {
                    return this.map[row][column][this.properties[name]];
                }
                else {
                    throw ("The property '" + property + "' with index '" + this.properties[name] + "' does not exist in the map.");
                }
            }
            else {
                throw ("Row " + row + " or Column " + column + " does not exist.");
            }
        }
        else {
            throw ("Property '" + property + "' does not exist.");
        }
    };
    IsoMap.prototype.nameProperty = function (name, valueIndex) {
        if (valueIndex > 1) {
            this.properties[name] = valueIndex;
        }
        else {
            throw ("valueIndex in IsoMap.nameProperty has to be bigger 1.");
        }
    };
    IsoMap.prototype.editProperty = function (name, valueIndex) {
        if (valueIndex > 1) {
            this.properties[name] = valueIndex;
        }
        else {
            throw ("valueIndex in IsoMap.nameProperty has to be bigger 1.");
        }
    };
    IsoMap.prototype.edit = function (x, y, value) {
        if (this.map === undefined) {
            this.map = new Array();
        }
        if (this.map[y] === undefined) {
            this.map[y] = new Array();
        }
        this.map[y][x] = value;
        return this;
    };
    return IsoMap;
})();
