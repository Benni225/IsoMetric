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
    var layers = App.layers, layer, text;
    init();
    // In this function we prepare our bird.
    function init() {
        // We add a new layer...
        layer = layers.add("layer");
        layer.addText("text", "This is a text");
        text = layer.getText("text");
        text.setColor("#f00");
        text.position.set(300, 300);
        text.setStrokeColor("#000");
        text.setStrokeWidth(2);
        text.setBackgroundColor("#ffff00");
        text.filled = true;
        text.setSize(55);
        text.setBaseline(IsoText.TOP);
        text.setAlign(IsoText.CENTER);
        text.addAnimation("r", "rotation", 359, 3000, IsoEasing.CircInOut, IsoAnimation.ENDLESS).play("r");
        text.anchor.set(0.5, 0.5);
        // ... and call our gameloop.
        loop();
    }
    // This function is our gameloop.
    function loop() {
        App.update();
        // We recall this function
        requestAnimationFrame(function () { return loop(); });
    }
};
//# sourceMappingURL=app.js.map