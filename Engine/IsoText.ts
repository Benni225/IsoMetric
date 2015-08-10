"use strict";
interface IsoColor {
    red: number;
    green: number;
    blue: number;
}
class IsoText extends IsoMinimalObject {
    static INHERIT = "inherit";
    static LEFTTORIGHT = "ltr";
    static RIGHTTOLEFT = "rtl";
    static TOP = "top";
    static HANGING = "hanging";
    static MIDDLE = "middle";
    static ALPHABETIC = "alphabetic";
    static IDEOGRAPHIC = "ideograpic";
    static BOTTOM = "bottom";
    static LEFT = "left";
    static RIGHT = "right";
    static START = "start";
    static END = "end";
    static CENTER = "center";

    /** Font of the text */
    font: string = "sans serif";
    /** Color of the text as string or as RGB */
    color: string|IsoColor;
    /** The background color of the text as string or as RGB */
    backgroundColor: string|IsoColor;
    /** The strokecolor of the text. */
    strokeColor: string;
    /** The stroke width. */
    strokeWidth: number = 0;
    /** The font size of the text in pixel. Default is 10. */
    size: number = 10;
    /** Color of the text as RGB calculated from IsoText.color */
    colorRGB: IsoColor;
    /** Background color of the text as RGB calculated from IsoText.backgroundColor */
    backgroundColorRGB: IsoColor;
    /** Stroke color of the text as RGB calculated from IsoText.strokeColor. */
    strokeColorRGB: IsoColor;
    /** Text of this object. */
    text: string;
    /** The fill style. If true the text is filled, else its stroked. */
    filled: boolean = true;
    /** The direction of the text. Possible values are IsoText.INHERIT, IsoText.LEFTTORIGHT or IsoText.RIGHTTOLEFT. Default is IsoText.INHERIT. */
    direction: string = IsoText.INHERIT;
    /** The baseline of the text. Possible values are IsoText.TOP, IsoText.HANGING, IsoText.MIDDLE, IsoText.ALPHABETIC, IsoText.IDEOGRAPHIC and IsoText.BOTTOM. The default is IsoText.ALPHABETIC. */
    baseline: string = IsoText.ALPHABETIC;
    /** The allignment of the text. Possible values are IsoText.START, IsoText.END, IsoText.LEFT, IsoText.RIGHT or IsoText.CENTER. Default is IsoText.START. */
    align: string = IsoText.START;
    /** Type of the object. */
    type: string = "IsoText";
    /** Creates a new text object. */
    constructor(Engine: IsoMetric, name: string, text?: string) {
        super(Engine);
        this.name = name;
        this.text = text;
        return this;
    }
    /** Sets the text. */
    setText(text: string): IsoText {
        this.text = text;
        return this;
    }
    /** Sets the font-size of the text. size can be a number in pixel or a string. */
    setSize(size: number): IsoText {
        this.size = size;
        return this;
    }
    /** Sets the value of the color red of the text. red is a value between 0 and 255. */
    setColorRed(red: number): IsoText {
        this.colorRGB.red = red;
        return this;
    }
    /** Sets the value of the color green of the text. green is a value between 0 and 255. */
    setColorGreen(green: number): IsoText {
        this.colorRGB.green = green;
        return this;
    }
    /** Sets the value of the color blue of the text. blue is a value between 0 and 255. */
    setColorBlue(blue: number): IsoText {
        this.colorRGB.blue = blue;
        return this;
    }
    /** Sets the value of the background color red of the text. red is a value between 0 and 255. */
    setBackgroundColorRed(red: number): IsoText {
        this.backgroundColorRGB.red = red;
        return this;
    }
    /** Sets the value of the background color green of the text. green is a value between 0 and 255. */
    setBackgroundColorGreen(green: number): IsoText {
        this.backgroundColorRGB.green = green;
        return this;
    }
    /** Sets the value of the background color blue of the text. blue is a value between 0 and 255. */
    setBackgroundColorBlue(blue: number): IsoText {
        this.backgroundColorRGB.blue = blue;
        return this;
    }
    /** Sets the value of the stroke color red of the text. red is a value between 0 and 255. */
    setStrokeColorRed(red: number): IsoText {
        this.strokeColorRGB.red = red;
        return this;
    }
    /** Sets the value of the stroke color green of the text. green is a value between 0 and 255. */
    setStrokeColorGreen(green: number): IsoText {
        this.strokeColorRGB.green = green;
        return this;
    }
    /** Sets the value of the stroke color blue of the text. blue is a value between 0 and 255. */
    setStrokeColorBlue(blue: number): IsoText {
        this.strokeColorRGB.blue = blue;
        return this;
    }
    /** Sets the color of a text. color can be a hex value or an object of IsoColor. */
    setColor(color: string|IsoColor): IsoText {
        if (typeof color === "string") {
            this.color = color;
            if (color === "transparent")
                this.colorRGB = null;
            else 
                this.colorRGB = this.hexToRGB(color);
        } else {
            this.colorRGB = color;
            this.color = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    }
    /** Sets te background color of the text. color can be a hex value or an object of IsoColor. */
    setBackgroundColor(color: string|IsoColor): IsoText {
        if (typeof color === "string") {
            this.backgroundColor = color;
            if (color === "transparent")
                this.backgroundColorRGB = null;
            else
                this.backgroundColorRGB = this.hexToRGB(color);
        } else {
            this.backgroundColorRGB = color;
            this.backgroundColor = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    }
    /** Sets the stroke color of a text. color can be a hex value or an object of IsoColor. */
    setStrokeColor(color: string|IsoColor): IsoText {
        if (typeof color === "string") {
            this.strokeColor = color;
            if (color === "transparent")
                this.strokeColorRGB = null;
            else 
                this.strokeColorRGB = this.hexToRGB(color);
        } else {
            this.strokeColorRGB = color;
            this.strokeColor = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    }
    /** Sets the stroke width of the text. */
    setStrokeWidth(width: number): IsoText {
        this.strokeWidth = width;
        return this;
    }
    /** Sets the font of the text.*/
    setFont(font: string): IsoText {
        this.font = font;
        return this;
    }
    /** Sets if the text is filled or not. */
    setFilled(fill: boolean): IsoText {
        this.filled = fill;
        return this;
    }

    /** Sets the direction of the text. */
    setDirection(direction: string): IsoText {
        this.direction = direction;
        return this;
    }

    /** Sets the baseline of the text. */
    setBaseline(baseline: string): IsoText {
        this.baseline = baseline;
        return this;
    }

    /** Sets the allignment of the text. */
    setAlign(align: string): IsoText {
        this.align = align;
        return this;
    }

    /** Gets the allignment of the text. */
    getAlign(): string {
        return this.align;
    }

    /** Gets the baseline of the text. */
    getBaseline(): string {
        return this.baseline;
    }

    /** Gets the direction of the text. */
    getDirection(): string {
        return this.direction;
    }

    /** Gets if the text is filled or not. */
    getFilled(): boolean {
        return this.filled;
    }

    /** Returns the text.*/
    getText(): string {
        return this.text;
    }
    /** Returns the size of the text. The returnd value can be a number or a string.*/
    getSize(): number|string {
        return this.size;
    }
    /** Returns the color of the text as an IsoColor object.*/
    getColorRGB(): IsoColor {
        return this.colorRGB;
    }
    /** Returns the background color of the text as an IsoColor object.*/
    getBackgroundColorRGB(): IsoColor {
        return this.backgroundColorRGB;
    }
    /** Returns the stroke color of the text as an IsoColor object.*/
    getStrokeColorRGB(): IsoColor {
        return this.strokeColorRGB;
    }
    /** Retruns the font.*/
    getFont(): string {
        return this.font;
    }
    /** Gets the stroke width of the text. */
    getStrokeWidth(): number|string {
        return this.strokeWidth;
    }
    /**
     * Converts a hex value to a RGB-color and return it. 
     * Code by Time Down @ stackoverflow.com
     * @see http://www.stackoverflow.com/user/96100/tim-down 
     */
    private hexToRGB(hex: string): IsoColor {
        var shortFormRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shortFormRegex, function (m, r, g, b): string {
            return r + r + g + g + b + b;
        });

        var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return rgb ? {
            red: parseInt(rgb[1], 16),
            green: parseInt(rgb[2], 16),
            blue: parseInt(rgb[3], 16)
        } : undefined;
    }
    /**
     * Converts a RGB-color to a hex value and return it. 
     * Code by Time Down @ stackoverflow.com
     * @see http://www.stackoverflow.com/user/96100/tim-down 
     */
    private rgbToHex(r, g, b): string {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    private ptToPx(size: string): string {
        size = size.replace(/([0-9]+)pt/g, function (m, g) {
            return Math.round(parseInt(g, 10) * (96 / 72)) + "px";
        });

        return size;
    }

    /** Gets the position on the screen. */
    getAbsolutePosition(): IsoVector2D {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    }
    /** Gets the original dimension of a text in pixel. @todo convert %, pt, em to px */
    getOriginalDimension(): IsoDimension {
        // Gets the font for reseting later
        var fontSize = this.Engine.canvas.context.font;
        var baseline = this.Engine.canvas.context.textBaseline;
        var align = this.Engine.canvas.context.textAlign;
        var direction = this.Engine.canvas.context.direction;

        // Configure the use font to get the right size.
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
        // Reset the font 
        this.Engine.canvas.context.font = fontSize;
        this.Engine.canvas.context.textBaseline = baseline;
        this.Engine.canvas.context.align = align;
        this.Engine.canvas.context.direction = direction;
        return {
            width: width,
            height: height
        }
    }
    /** Gets the dimension of the object on the screen. */
    getAbsoluteDimension(): IsoDimension {
        var dimension = this.getOriginalDimension();

        return {
            width: dimension.width * this.zoomLevel * this.scale.factorX,
            height: dimension.height * this.zoomLevel * this.scale.factorY
        };
    }

    /** Gets all important information for rendering an object. */
    getRenderDetails(): IIsoRenderDetails {
        var dimension = this.getOriginalDimension();
        var fx = this.anchor.x / dimension.width * this.scale.factorX,
            fy = this.anchor.y / dimension.height * this.scale.factorY;
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
    }
}