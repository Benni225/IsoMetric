/// <reference path="../../IsoMetric.d.ts" />
window.onload = function () {
    var app = new IsoMetric(new IsoConfig());
    IsoLogger.DEBUG = true;
    // Create a new layer.
    var layer = new IsoLayer("stage");
    app.layers.add(layer);
    // Load the resource.
    app.resources.add(new IsoImageResource("birdResource", new IsoImage("../../images/bird/bird.png")));
    app.resources.add(new IsoVideoResource("videoResource", new IsoVideo(["../../images/video/doku.mp4"])));
    app.resources.get("videoResource").source["loadType"] = IsoVideo.STREAM;
    app.resources.on("load", function () { return init(); });
    app.resources.load();
    // Inits the scene
    function init() {
        var bird = new IsoSprite("bird");
        // Lets mix some textures.
        bird.addTexture(new IsoImageTexture("birdTexture", app.resources.get("birdResource")));
        bird.addTexture(new IsoVideoTexture("videoTexture", app.resources.get("videoResource")));
        var vid = bird.getTexture("videoTexture");
        vid.play();
        vid.blendingMode = IsoBlendingModes.SOURCE_IN;
        vid.src.get().setSize(new IsoSize(717, 610));
        // Set the last properties.
        bird.position.set(window.innerWidth / 2, window.innerHeight / 2);
        bird.size = new IsoSize(717, 610);
        bird.scale = new IsoScale(0.5, 0.5);
        bird.anchor = new IsoPoint(0.5, 0.5);
        bird.animations.add("rotate", {
            endValue: 359,
            duration: 4000,
            playType: IsoAnimation.PLAY_LOOP,
            repetitions: IsoAnimation.REPEAT_ENDLESS,
            trackDirection: IsoAnimation.TRACK_PINGPONG,
            property: "rotation",
            effect: IsoEasing.SineInOut
        }).play();
        layer.add(bird);
        // Start the loop
        update();
    }
    // Updates the scene
    function update() {
        app.update();
        app.canvas.context.font = "bold 14px Arial";
        app.canvas.context.fillStyle = "#000";
        app.canvas.context.fillText("FPS: " + app.FPS, 10, 10);
        app.canvas.context.fillText("We render a video texture.", 10, 30);
        requestAnimationFrame(function () { return update(); });
    }
};
//# sourceMappingURL=app.js.map