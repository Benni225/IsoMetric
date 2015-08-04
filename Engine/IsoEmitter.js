var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoEmitter = (function (_super) {
    __extends(IsoEmitter, _super);
    function IsoEmitter() {
        _super.apply(this, arguments);
        this.maxParticleCount = 200;
        this.emissionRate = 4;
        this.spread = Math.PI / 32;
        this.variance = 100;
        this.particles = new Array();
        this.isEmitting = false;
        this.lifetime = 200;
        this.particleVelocity = new IsoVector2D(0, 0);
    }
    IsoEmitter.prototype.setSpread = function (spread) {
        this.spread = spread;
        return this;
    };
    IsoEmitter.prototype.setVariance = function (variance) {
        this.variance = variance / 100;
        return this;
    };
    IsoEmitter.prototype.setMaximalParticleCount = function (count) {
        this.maxParticleCount = count;
        return this;
    };
    IsoEmitter.prototype.setEmissionRate = function (count) {
        this.emissionRate = count;
        return this;
    };
    IsoEmitter.prototype.setParticle = function (particle) {
        this.ressource = particle;
        return this;
    };
    IsoEmitter.prototype.createParticle = function () {
        var angle = this.rotation + this.particleVelocity.getAngle() + (Math.random() * this.variance);
        var magnitude = this.particleVelocity.getMagnitude();
        var position = new IsoVector2D(this.position.x, this.position.y);
        var velocity = new IsoVector2D();
        velocity.createFromAngle(angle, magnitude);
        var p = new IsoParticle(this.Engine, this.ressource, position, velocity, new IsoVector2D(0, 0));
        p.lifetimeStart = new Date().getTime();
        p.lifetimeEnd = new Date().getTime() + this.lifetime + Math.floor((Math.random() * this.variance));
        return p;
    };
    IsoEmitter.prototype.createParticles = function () {
        if (this.particles.length < this.maxParticleCount) {
            var p = this.createParticle();
            if (this.particles.length > 0) {
                for (var i = 0; i < this.particles.length; i++) {
                    if (this.particles[i] === undefined) {
                        p.addAnimation("alpha", "alpha", 0, p.lifetimeEnd - p.lifetimeStart, IsoEasing.Linear).play("alpha");
                        this.particles[i] = p;
                        return;
                    }
                }
            }
            this.particles.push(p);
        }
    };
    IsoEmitter.prototype.emit = function () {
        this.isEmitting = true;
    };
    IsoEmitter.prototype.stopEmitting = function () {
        this.isEmitting = false;
    };
    IsoEmitter.prototype.update = function () {
        var actualTime = new Date().getTime();
        if (this.isEmitting === true) {
            this.createParticles();
            for (var i = 0; i < this.particles.length; i++) {
                if (this.particles[i] !== undefined) {
                    if (this.particles[i].lifetimeEnd < actualTime) {
                        delete (this.particles[i]);
                    }
                    else {
                        this.particles[i].ressource.zoomLevel = this.zoomLevel;
                        this.particles[i].ressource.zoomPoint = this.zoomPoint;
                        this.particles[i].ressource.scale = this.scale;
                        this.particles[i].ressource.scrollPosition = this.scrollPosition;
                        this.particles[i].ressource.offset = this.offset;
                        this.particles[i].ressource.anchor = this.anchor;
                        this.particles[i].move();
                    }
                }
            }
        }
    };
    IsoEmitter.prototype.getRenderDetails = function () {
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.getOriginalDimension(),
            renderSize: this.getAbsoluteDimension(),
            anchor: new IsoPoint(this.position.x, this.position.y),
            particles: this.particles,
            offset: this.offset.get(),
            zoomLevel: this.zoomLevel,
            type: "IsoEmitter",
        };
    };
    IsoEmitter.prototype.getOriginalDimension = function () {
        return {
            width: 0,
            height: 0
        };
    };
    IsoEmitter.prototype.getOriginalHeight = function () {
        return 0;
    };
    IsoEmitter.prototype.getOriginalWidth = function () {
        return 0;
    };
    IsoEmitter.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    IsoEmitter.prototype.getAbsoluteDimension = function () {
        return {
            width: this.getOriginalDimension().width * this.zoomLevel * this.scale.factorX,
            height: this.getOriginalDimension().height * this.zoomLevel * this.scale.factorY
        };
    };
    return IsoEmitter;
})(IsoMinimalObject);
