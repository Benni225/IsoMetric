///<reference path="../core/IsoObject.ts" />
class IsoAnimationManager extends IsoObject {
    Engine: IsoMetric;
    object: Object;
    animations: Array<IsoAnimation> = new Array();

    constructor(object: Object) {
        super();
        this.object = object;
    }
    add(name: string, animation: IAnimationOptions): IsoAnimation {
        animation["object"] = this.object;
        var a = new IsoAnimation(name, animation);
        this.animations.push(a);
        return a;
    }

    remove(name: string): IsoAnimationManager {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name) {
                for (var l = i; l < this.animations.length; l++) {
                    this.animations[l] = null;
                    this.animations[l] = this.animations[l + 1];
                }
                this.animations.pop();
                return this;
            }
        }
    }
    play(name: string): IsoAnimation {
        this.get(name).play();
        return this.get(name);
    }
    pause(name: string): IsoAnimation {
        this.get(name).pause();
        return this.get(name);
    }
    resume(name: string): IsoAnimation {
        this.get(name).resume();
        return this.get(name);
    }
    stop(name: string): IsoAnimation {
        this.get(name).stop();
        return this.get(name);
    }

    get(name): IsoAnimation {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name) {
                return this.animations[i];
            }
        }
        this.log("Can not find the animation: '" + name + "'. :(", IsoLogger.WARN);
    }

    update() {
        for (var i = 0; i < this.animations.length; i++) {
            this.animations[i].update();
        }
    }

}