interface IImageData {
    x: number;
    y: number;
    width: number;
    height: number;
    image: any;
}

interface IColorData {
    r: number;
    g: number;
    b: number;
    hex: string;
}

interface ITextureData {
    imageData?: IImageData;
    colorData?: IColorData;
    blendingMode: string;
    alpha: number;
}

interface IRenderData {
    maskData?: IsoTexture;
    textureData?: Array<ITextureData>;
    position: IsoVector2D;
    rotation: number;
    anchor: IsoPoint;
    size: IsoSize;
    alpha?: number;
    blendingMode?: string;
}

interface IAnimationOptions {
    endValue: number;
    startValue?: number;
    time?: number;
    duration?: number;
    effect?: Function;
    playType?: string;
    trackDirection?: string;
    repetitions?: string|number;
    property: string;
    round?: Function;
    object?: Object;
}

interface IBodyOptions {
    type: string;
    radius?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    maxSides?: number;
    vertices?: Array<Array<number>>;
    flagInternal?: boolean;
    removeCollinear?: number;
    minimumArea?: number;
    sides?: number;
    slope?: number;
    options?: Matter.IBodyDefinition;
};