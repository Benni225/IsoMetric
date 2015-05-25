///<reference path = "IsoSprite.ts" />
class IsoCharacter extends IsoSprite {
    attributes: Object;
    constructor(Engine: IsoMetric, name: string, src: string, tileWidth: number, tileHeight: number, layer: IsoLayer) {
        super(Engine, name, src, tileWidth, tileHeight, layer);
    }

    addAttribute(name: string, value: any): IsoCharacter {
        this.attributes[name] = value;
        return this;
    }

    getAttribute(name: string): any {
        return this.attributes[name];
    }
}