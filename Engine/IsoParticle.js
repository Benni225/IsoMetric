var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoParticle = (function (_super) {
    __extends(IsoParticle, _super);
    function IsoParticle(Engine, object, position, velocity, acceleration) {
        _super.call(this, Engine);
        this.lifetimeStart = 0;
        this.lifetimeEnd = 0;
        this.velocity = new IsoVector2D(0, 0);
        this.position = new IsoVector2D(0, 0);
        this.acceleration = new IsoVector2D(0, 0);
        this.anchor = new IsoPoint(0, 0);
        this.ressource = object;
        this.velocity = velocity;
        this.position = position;
        this.acceleration = acceleration;
    }
    IsoParticle.prototype.move = function () {
        this.ressource.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        return this;
    };
    IsoParticle.prototype.getRenderDetails = function () {
        var r = this.ressource.getRenderDetails();
        r.position = this.position;
        r.anchor = this.anchor;
        r["alpha"] = this.alpha;
        return r;
    };
    IsoParticle.prototype.updatePosition = function () {
    };
    return IsoParticle;
})(IsoMinimalObject);
