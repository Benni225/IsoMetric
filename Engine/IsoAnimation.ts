var IsoEasing = {
    Linear: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * currentIteration / iterationCount + startValue;
    },
    QuadIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        currentIteration = currentIteration / iterationCount;
        return (endValue - startValue) * currentIteration * currentIteration + startValue;
    },
    QuadOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (currentIteration /= iterationCount) * (currentIteration - 2) + startValue;
    },
    QuadInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * currentIteration * currentIteration + startValue;
        }
        return -(endValue - startValue) / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    },
    CubicIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 3) + startValue;
    },
    CubicOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 3) + 1) + startValue;
    },
    CubicInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    },
    QuartIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 4) + startValue;
    },
    QuartOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 4) - 1) + startValue;
    },
    QuartInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -(endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    },
    QuintIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 5) + startValue;
    },
    QuintOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 5) + 1) + startValue;
    },
    QuintInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    },
    SineIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.cos(currentIteration / iterationCount * (Math.PI / 2))) + startValue;
    },
    SineOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sin(currentIteration / iterationCount * (Math.PI / 2)) + startValue;
    },
    SineInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) / 2 * (1 - Math.cos(Math.PI * currentIteration / iterationCount)) + startValue;
    },
    ExpoIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(2, 10 * (currentIteration / iterationCount - 1)) + startValue;
    },
    ExpoOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (-Math.pow(2, -10 * currentIteration / iterationCount) + 1) + startValue;
    },
    ExpoInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    },
    CircIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.sqrt(1 - (currentIteration /= iterationCount) * currentIteration)) + startValue;
    },
    CircOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sqrt(1 - (currentIteration = currentIteration / iterationCount - 1) * currentIteration) + startValue;
    },
    CircInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    }
};

class IsoAnimation {
    static ONCE: string = "once";
    static PINGPONG: string = "pingpong";
    static ENDLESS: string = "endless";

    static ANIMATION_TYPE_FRAME: string = "frame";
    static ANIMATION_TYPE_ATTRIBUTE: string = "attribute";

    name: string;
    duration: number;
    frames: Array<number>;
    framesPerSecond: number = 60;
    startValue: number;
    endValue: number;
    actualValue: number;
    attribute: string;
    change: number;
    type: string;
    easing: Function = IsoEasing.Linear;
    isPlaying: boolean = false;
    callbacks: Array<IsoCallback>;
    object: Object;
    sprite: IsoAnimatedSprite;
    timerStart: Date;
    timerActual: Date;
    iterations: number;
    currentIteration: number = 0;

    __debug: number = 0;


    animationType: string = "attribute";
    constructor() {
        return this;
    }

    createFrameAnimation(name: string, object: IsoAnimatedSprite, frames: Array<number>, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimation {
        this.name = name;
        this.sprite = object;
        this.frames = frames;
        this.startValue = frames[0];
        this.endValue = frames[frames.length - 1];
        this.duration = duration;
        this.easing = easing;
        this.type = type;
        this.callbacks = callbacks;
        this.animationType = IsoAnimation.ANIMATION_TYPE_FRAME;
        return this;
    }

    createAnimation(name: string, object: Object, attribute: string, endValue: number, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimation {
        this.name = name;
        this.object = object;
        this.attribute = attribute;
        this.startValue = object[attribute]|0;
        this.endValue = endValue;
        this.duration = duration;
        this.easing = easing;
        this.type = type;
        this.callbacks = callbacks;
        this.animationType = IsoAnimation.ANIMATION_TYPE_ATTRIBUTE;
        return this;
    }

    play(): IsoAnimation {
        if (this.isPlaying === false) {
            console.log("Play");
            this.iterations = (this.duration / 1000) * this.framesPerSecond;
            this.currentIteration = 0;
            this.isPlaying = true;
            if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
                this.__playAttribute();
            } else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
                this.__playFrame();
            }
        }
        return this;
    }

    __playAttribute() {
        if (this.isPlaying === true) {
            if (this.currentIteration === 0) {
                this.actualValue = this.startValue;
            }
            this.currentIteration++;
            this.actualValue = this.easing(this.currentIteration, this.startValue, this.endValue, this.iterations);

            this.object[this.attribute] = this.actualValue;
            if (this.actualValue === this.endValue) {
                switch (this.type) {
                    case IsoAnimation.ONCE:
                        this.stop();
                        break;
                    case IsoAnimation.PINGPONG:
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                }
            } else {
                if (this.isPlaying === true)
                    requestAnimationFrame(() => this.__playAttribute());
            }
        }        
    }

    __playFrame() {
        if (this.isPlaying !== true) {
            this.actualValue = this.startValue;
            this.isPlaying = true;
        }
        this.actualValue = Math.floor(this.easing.call(this, this.actualValue, this.startValue, this.endValue, (this.endValue - this.startValue)));
        this.sprite.setTile(this.actualValue);
        if (this.actualValue === this.endValue) {
            switch (this.type) {
                case IsoAnimation.ONCE:
                    this.stop();
                    break;
                case IsoAnimation.PINGPONG:
                    var endValue = this.endValue;
                    this.endValue = this.startValue;
                    this.startValue = endValue;
                    break;
                case IsoAnimation.ENDLESS:
                    this.actualValue = this.startValue;
                    break;
            }
        }
    }

    stop(): IsoAnimation {
        console.log("Stop");
        this.isPlaying = false;
        return this;
    }

    pause(): IsoAnimation {
        console.log("Pause");
        this.isPlaying = false;
        return this;
    }

    resume(): IsoAnimation {
        console.log("Resume");
        this.isPlaying = true;
        if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
            this.__playAttribute();
        } else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
            this.__playFrame();
        }
        return this;
    }

}