/// <reference path="../../IsoMetric.d.ts" />
window.onload = function () {
    var app = new IsoMetric(new IsoConfig()), im = false;
    var bird;
    IsoLogger.DEBUG = true;
    // Create a new layer.
    var layer = new IsoLayer("stage");
    app.layers.add(layer);
    // Load the resource.
    app.resources.add(new IsoImageResource("birdResource", new IsoImage("../../images/bird/bird.png")));
    app.resources.add(new IsoImageResource("skyResource", new IsoImage("../../images/sky.jpg")));
    app.resources.on("load", function () { return init(); });
    app.resources.load();
    // Inits the scene
    function init() {
        bird = new IsoEmitter("emitter");
        // Lets mix some textures.
        bird.addTexture(new IsoImageTexture("birdTexture", app.resources.get("birdResource")));
        bird.addTexture(new IsoImageTexture("skyTexture", app.resources.get("skyResource")));
        bird.addTexture(new IsoImageTexture("birdTexture2", app.resources.get("birdResource")));
        bird.getTexture("skyTexture").blendingMode = IsoBlendingModes.SOURCE_IN;
        bird.getTexture("birdTexture2").blendingMode = IsoBlendingModes.SOFT_LIGHT;
        // Set the last properties.
        bird.position.set(window.innerWidth / 2, window.innerHeight / 2);
        bird.size = new IsoSize(717, 610);
        bird.lifetime = 2000;
        bird.scale.set(0.5, 0.5);
        bird.maxParticles = 500;
        bird.emissionRate = 5;
        bird.velocity.set(-1, 0);
        bird.anchor = new IsoPoint(0.5, 0.5);
        bird.blendingMode = IsoBlendingModes.LIGHTEN;
        bird.emit();
        layer.add(bird);
        // Start the loop
        update();
    }
    // Updates the scene
    function update() {
        app.update();
        if (bird.position.x < 0) {
            bird.velocity.set(1, 0);
            bird.speed.set(-1, 0);
        }
        else if (bird.position.x > window.innerWidth) {
            bird.velocity.set(-1, 0);
            bird.speed.set(1, 0);
        }
        app.canvas.context.font = "bold 14px Arial";
        app.canvas.context.fillStyle = "#000";
        app.canvas.context.fillText("FPS: " + app.FPS, 10, 10);
        app.canvas.context.fillText("We render 100 birds with a multi-layered texture.", 10, 30);
        requestAnimationFrame(function () { return update(); });
    }
};
//# sourceMappingURL=app.js.map