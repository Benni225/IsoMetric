"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoText = (function (_super) {
    __extends(IsoText, _super);
    function IsoText(Engine, name, text) {
        _super.call(this, Engine);
        this.font = "sans serif";
        this.strokeWidth = 0;
        this.size = 10;
        this.filled = true;
        this.direction = IsoText.INHERIT;
        this.baseline = IsoText.ALPHABETIC;
        this.align = IsoText.START;
        this.name = name;
        this.text = text;
        return this;
    }
    IsoText.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    IsoText.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    IsoText.prototype.setColorRed = function (red) {
        this.colorRGB.red = red;
        return this;
    };
    IsoText.prototype.setColorGreen = function (green) {
        this.colorRGB.green = green;
        return this;
    };
    IsoText.prototype.setColorBlue = function (blue) {
        this.colorRGB.blue = blue;
        return this;
    };
    IsoText.prototype.setBackgroundColorRed = function (red) {
        this.backgroundColorRGB.red = red;
        return this;
    };
    IsoText.prototype.setBackgroundColorGreen = function (green) {
        this.backgroundColorRGB.green = green;
        return this;
    };
    IsoText.prototype.setBackgroundColorBlue = function (blue) {
        this.backgroundColorRGB.blue = blue;
        return this;
    };
    IsoText.prototype.setStrokeColorRed = function (red) {
        this.strokeColorRGB.red = red;
        return this;
    };
    IsoText.prototype.setStrokeColorGreen = function (green) {
        this.strokeColorRGB.green = green;
        return this;
    };
    IsoText.prototype.setStrokeColorBlue = function (blue) {
        this.strokeColorRGB.blue = blue;
        return this;
    };
    IsoText.prototype.setColor = function (color) {
        if (typeof color === "string") {
            this.color = color;
            if (color === "transparent")
                this.colorRGB = null;
            else
                this.colorRGB = this.hexToRGB(color);
        }
        else {
            this.colorRGB = color;
            this.color = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    };
    IsoText.prototype.setBackgroundColor = function (color) {
        if (typeof color === "string") {
            this.backgroundColor = color;
            if (color === "transparent")
                this.backgroundColorRGB = null;
            else
                this.backgroundColorRGB = this.hexToRGB(color);
        }
        else {
            this.backgroundColorRGB = color;
            this.backgroundColor = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    };
    IsoText.prototype.setStrokeColor = function (color) {
        if (typeof color === "string") {
            this.strokeColor = color;
            if (color === "transparent")
                this.strokeColorRGB = null;
            else
                this.strokeColorRGB = this.hexToRGB(color);
        }
        else {
            this.strokeColorRGB = color;
            this.strokeColor = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    };
    IsoText.prototype.setStrokeWidth = function (width) {
        this.strokeWidth = width;
        return this;
    };
    IsoText.prototype.setFont = function (font) {
        this.font = font;
        return this;
    };
    IsoText.prototype.setFilled = function (fill) {
        this.filled = fill;
        return this;
    };
    IsoText.prototype.setDirection = function (direction) {
        this.direction = direction;
        return this;
    };
    IsoText.prototype.setBaseline = function (baseline) {
        this.baseline = baseline;
        return this;
    };
    IsoText.prototype.setAlign = function (align) {
        this.align = align;
        return this;
    };
    IsoText.prototype.getAlign = function () {
        return this.align;
    };
    IsoText.prototype.getBaseline = function () {
        return this.baseline;
    };
    IsoText.prototype.getDirection = function () {
        return this.direction;
    };
    IsoText.prototype.getFilled = function () {
        return this.filled;
    };
    IsoText.prototype.getText = function () {
        return this.text;
    };
    IsoText.prototype.getSize = function () {
        return this.size;
    };
    IsoText.prototype.getColorRGB = function () {
        return this.colorRGB;
    };
    IsoText.prototype.getBackgroundColorRGB = function () {
        return this.backgroundColorRGB;
    };
    IsoText.prototype.getStrokeColorRGB = function () {
        return this.strokeColorRGB;
    };
    IsoText.prototype.getFont = function () {
        return this.font;
    };
    IsoText.prototype.getStrokeWidth = function () {
        return this.strokeWidth;
    };
    IsoText.prototype.hexToRGB = function (hex) {
        var shortFormRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shortFormRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return rgb ? {
            red: parseInt(rgb[1], 16),
            green: parseInt(rgb[2], 16),
            blue: parseInt(rgb[3], 16)
        } : undefined;
    };
    IsoText.prototype.rgbToHex = function (r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    IsoText.prototype.ptToPx = function (size) {
        size = size.replace(/([0-9]+)pt/g, function (m, g) {
            return Math.round(parseInt(g, 10) * (96 / 72)) + "px";
        });
        return size;
    };
    IsoText.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    IsoText.prototype.getOriginalDimension = function () {
        var fontSize = this.Engine.canvas.context.font;
        var baseline = this.Engine.canvas.context.textBaseline;
        var align = this.Engine.canvas.context.textAlign;
        var direction = this.Engine.canvas.context.direction;
        this.Engine.canvas.context.font = this.size + "px " + this.font;
        this.Engine.canvas.context.textBaseline = this.baseline;
        this.Engine.canvas.context.textAlign = this.align;
        this.Engine.canvas.context.direction = this.direction;
        var width = 0;
        var height = 0;
        if (this.text !== undefined) {
            var m = this.Engine.canvas.context.measureText(this.text);
            width = m.width;
            height = this.size;
        }
        this.Engine.canvas.context.font = fontSize;
        this.Engine.canvas.context.textBaseline = baseline;
        this.Engine.canvas.context.align = align;
        this.Engine.canvas.context.direction = direction;
        return {
            width: width,
            height: height
        };
    };
    IsoText.prototype.getAbsoluteDimension = function () {
        var dimension = this.getOriginalDimension();
        return {
            width: dimension.width * this.zoomLevel * this.scale.factorX,
            height: dimension.height * this.zoomLevel * this.scale.factorY
        };
    };
    IsoText.prototype.getRenderDetails = function () {
        var dimension = this.getOriginalDimension();
        var fx = this.anchor.x / dimension.width * this.scale.factorX, fy = this.anchor.y / dimension.height * this.scale.factorY;
        var backgroundColor = null;
        var color = null;
        var strokeColor = null;
        if (this.colorRGB !== undefined && this.colorRGB !== null) {
            color = this.rgbToHex(this.colorRGB.red, this.colorRGB.green, this.colorRGB.blue);
        }
        if (this.backgroundColorRGB !== undefined && this.backgroundColorRGB !== null) {
            backgroundColor = this.rgbToHex(this.backgroundColorRGB.red, this.backgroundColorRGB.green, this.backgroundColorRGB.blue);
        }
        if (this.strokeColorRGB !== undefined && this.strokeColorRGB !== null) {
            strokeColor = this.rgbToHex(this.strokeColorRGB.red, this.strokeColorRGB.green, this.strokeColorRGB.blue);
        }
        return {
            position: this.getAbsolutePosition(),
            renderSize: this.getAbsoluteDimension(),
            anchor: new IsoPoint((this.position.x + (dimension.width * this.scale.factorX * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (dimension.height * this.scale.factorY * this.zoomLevel * fy * this.scale.factorY))),
            text: this.text,
            offset: this.offset.get(),
            zoomLevel: this.zoomLevel,
            color: color,
            backgroundColor: backgroundColor,
            strokeColor: strokeColor,
            strokeWidth: this.strokeWidth,
            align: this.align,
            filled: this.filled,
            baseline: this.baseline,
            direction: this.direction,
            size: this.size,
            font: this.font,
            type: "IsoText"
        };
    };
    IsoText.INHERIT = "inherit";
    IsoText.LEFTTORIGHT = "ltr";
    IsoText.RIGHTTOLEFT = "rtl";
    IsoText.TOP = "top";
    IsoText.HANGING = "hanging";
    IsoText.MIDDLE = "middle";
    IsoText.ALPHABETIC = "alphabetic";
    IsoText.IDEOGRAPHIC = "ideograpic";
    IsoText.BOTTOM = "bottom";
    IsoText.LEFT = "left";
    IsoText.RIGHT = "right";
    IsoText.START = "start";
    IsoText.END = "end";
    IsoText.CENTER = "center";
    return IsoText;
})(IsoMinimalObject);
