// We include the definitions of IsoMetric
/// <reference path="../../isometric.d.ts" />
// After the window completly loaded, we start our app
window.onload = function () {
    // We start an app with the size 640*480
    var App = new IsoMetric({
        fullscreen: false,
        width: 640,
        height: 480
    });
    // For a better overview, we reference some classes.
    var ressources = App.ressources, layers = App.layers, layer, bird;
    // Lets add a new image-ressource...
    ressources.add("ourImage", "../../images/bird/Bird.png", IsoRessource.IMAGE);
    // ... and load it. After loading call "init()"
    ressources.load().then(function () { return init(); });
    // In this function we prepare our bird.
    function init() {
        // We add a new layer...
        layer = layers.add("layer");
        // ... and create a new object with our image.
        bird = layer.addObject("bird", ressources.get("ourImage"));
        // Now we add an animation. In this animation we want to rotate our bird endless.
        bird.addAnimation("rotate", "rotation", 360, 3000, IsoEasing.Linear, IsoAnimation.ENDLESS);
        // Set the scale of the bird
        bird.setScale(0.3, 0.3);
        // Set the position of the bird
        bird.setPosition({ x: 50, y: 50 });
        // We set the anchor of our bird in the center of the image.
        bird.setAnchor(bird.width / 2, bird.height / 2);
        // Now, we start playing our animation.
        bird.play("rotate");
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