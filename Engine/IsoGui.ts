"use strict"

/**
 * This class helps you to building up a graphic user interface. Every Gui will drawn on top of all layers.
 */

interface IsoGuiItem {
    sprite?: IsoAnimatedSprite;
    html?: HTMLElement;
    text?: string;
    fillStyle?: string;
    fontStyle?: string;
    name: string;
    tooltip?: string;
    hover?: EventListener;
    mouseup?: EventListener;
    mousedown?: EventListener;
    click?: EventListener;
}

interface IsoGuiGroup {
    name: string;
    items?: string;
}

class IsoGui {
    Engine: IsoMetric;
    groups: IsoGuiGroup;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }
}