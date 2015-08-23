class IsoPhysics extends IsoObject {
    body: Matter.Body = null;
    entity: IsoBaseEntity;
    constructor() {
        super();

    }

    addBody(options: IBodyOptions): IsoPhysics {
        try {
            if (!Matter) {
                this.log("I have problems with the physics. I can not find Matter.js. You need to bind in it by yourself. :(", IsoLogger.WARN);
                this.log("You can find information about Matter.js here: https://github.com/liabru/matter-js", IsoLogger.INFO);
                this.log("The library is located in the directory 'external/matterJs'.", IsoLogger.INFO);
                return this;
            }
            switch (options.type) {
                case "rectangle":
                    this.body = Matter.Bodies.rectangle(options.x || this.entity.position.x, options.y || this.entity.position.y, options.width || this.entity.size.width, options.height || this.entity.size.height, options.options);
                    break;
                case "circle":
                    this.body = Matter.Bodies.circle(options.x || this.entity.position.x, options.y || this.entity.position.y, options.radius, options.options, options.maxSides || undefined);
                    break;
                case "fromVertices":
                    this.body = Matter.Bodies["fromVertices"](options.x || this.entity.position.x, options.y || this.entity.position.y, options.vertices, options.flagInternal || false, options.removeCollinear || 0.01, options.minimumArea || 10);
                    break;
                case "polygon":
                    this.body = Matter.Bodies.polygon(options.x || this.entity.position.x, options.y || this.entity.position.y, options.sides, options.radius, options.options);
                    break;
                case "trapezoid":
                    this.body = Matter.Bodies.trapezoid(options.x || this.entity.position.x, options.y || this.entity.position.y, options.width || this.entity.size.width, options.height || this.entity.size.height, options.slope, options.options);
                    break;
            }
            Matter.World.add(IsoMetric.self.physics.physicsEngine.world, this.body);
            return this;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }

    updateEntity() {
        if (this.hasBody()) {
            this.entity.rotation = this.body.angle / 180 * Math.PI;
            this.entity.position = new IsoVector2D(this.body.position.x, this.body.position.y);
        }
    }

    hasBody(): boolean {
        if (this.body !== null) {
            return true;
        } else {
            return false;
        }
    }
}