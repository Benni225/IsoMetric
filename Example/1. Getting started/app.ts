/// <reference path="../../IsoMetric.d.ts" />
window.onload = () => {
    var app = new IsoMetric(new IsoConfig()),
        im: boolean = false;
    IsoLogger.DEBUG = true;
    // Create a new layer.
    var layer = new IsoLayer("stage");
    app.layers.add(layer);

    // Load the resource.
    app.resources.add(new IsoImageResource("birdResource", new IsoImage("../../images/bird/bird.png")));
    app.resources.add(new IsoImageResource("skyResource", new IsoImage("../../images/sky.jpg")));
    app.resources.on("load", () => init());
    app.resources.load();

    // Inits the scene
    function init() {
        for (var i = 0; i < 100; i++) {
            var bird: IsoSprite = new IsoSprite("bird" + i);
            // Lets mix some textures.
            bird.addTexture(new IsoImageTexture("birdTexture", <IsoImageResource>app.resources.get("birdResource")));
            bird.addTexture(new IsoImageTexture("skyTexture", <IsoImageResource>app.resources.get("skyResource")));
            bird.addTexture(new IsoImageTexture("birdTexture2", <IsoImageResource>app.resources.get("birdResource")));
            bird.getTexture("skyTexture").blendingMode = IsoBlendingModes.SOURCE_IN;
            bird.getTexture("birdTexture2").blendingMode = IsoBlendingModes.SOFT_LIGHT;

            // Set the last properties.
            bird.position.set(Math.random() * (window.innerWidth) + 0, Math.random() * (window.innerHeight) + 0);
            bird.size = new IsoSize(717, 610);
            bird.scale = new IsoScale(0.5, 0.5);
            bird.anchor = new IsoPoint(0.5, 0.5);
            bird.index = i;
            layer.add(bird);
        }

        // Start the loop
        update();
    }
    // Updates the scene
    function update() {
        app.update();
        app.canvas.context.font = "bold 14px Arial";
        app.canvas.context.fillStyle = "#000";
        app.canvas.context.fillText("FPS: " + app.FPS, 10, 10);
        app.canvas.context.fillText("We render 100 birds with a multi-layered texture.", 10, 30);
        requestAnimationFrame(() => update());
    }
};