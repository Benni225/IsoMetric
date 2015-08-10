// We include the definitions of IsoMetric
/// <reference path="../../isometric.d.ts" />
// After the window completly loaded, we start our app
window.onload = function () {
    // We start an app with the size 640*480
    var App = new IsoMetric({
        fullscreen: true,
        width: 640,
        height: 480
    });
    // For a better overview, we reference some classes.
    var ressources = App.ressources, layers = App.layers, layer, bird, emitter;
    // Lets add a new image-ressource...
    ressources.add("ourImage", new IsoImage("../../images/bird/Bird.png"));
    // ... and load it. After loading call "init()"
    ressources.load().then(function () { return init(); });
    // In this function we prepare our bird.
    function init() {
        // We add a new layer...
        layer = layers.add("layer");
        emitter = layer.addEmitter("birdE", ressources.get("ourImage"));
        emitter.position.set(800, 100);
        emitter.setVariance(10);
        emitter.rotation = 0;
        emitter.setScale(0.25, 0.25);
        emitter.velocity.set(-1, 0);
        emitter.blendingMode = IsoBlendingModes.SOFT_LIGHT;
        emitter.lifetime = 1000;
        emitter.particleCount = 1000;
        emitter.spreadCount = 10;
        emitter.emit();
        // ... and call our gameloop.
        loop();
    }
    // This function is our gameloop.
    function loop() {
        // We update our app and render our bird to the screen.
        App.update();
        // We recall this function
        requestAnimationFrame(function () { return loop(); });
    }
};
//# sourceMappingURL=app.js.map