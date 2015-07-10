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
    var ressources = App.ressources,
        layers = App.layers,
        layer: IsoLayer,
        bird: IsoAnimatedSprite,
        sky: IsoBillboard;

    // Lets add a new image-ressource...
    ressources.add("ourStripe", "../../images/bird/Bird-Stripe.png", IsoRessource.IMAGE);
    ressources.add("sky", "../../images/sky.jpg", IsoRessource.IMAGE);
    // ... and load it. After loading call "init()"
    ressources.load().then(() => init());

    // In this function we prepare our bird.
    function init() {
        // We add a new layer...
        layer = layers.add("layer");

        // ... and create a new animated sprite with our image.
        bird = layer.addAnimatedSprite("bird", ressources.get("ourStripe"), {
            tile: 1,
            height: 0,
            size: { width: 717, height: 610 }
        });

        // add our sky 
        sky = layer.addBillboard("sky", ressources.get("sky"));
        // set repeating type.
        sky.setRepeat(IsoBillboard.REPEAT);
        // Now we add an animation. In this animation we want to rotate our bird endless.
        bird.addFrameAnimation("fly", [1, 2, 3, 4], 400, IsoEasing.QuadIn, IsoAnimation.PINGPONG);

        // Set the scale of the bird
        bird.setScale(0.3, 0.3);

        // Set the position of the bird
        bird.setPosition({x: 50, y: 50});

        // We set the anchor of our bird in the center of the image.
        bird.setAnchor(bird.width / 2, bird.height / 2);

        // Now, we start playing our animation.
        bird.play("fly");

        // ... and call our gameloop.
        loop();
    }
    // This function is our gameloop.
    function loop() {
        // Scroll the sky.
        sky.scroll(-1, 0.5);
        // We update our app and render our bird to the screen.
        App.update();

        // We recall this function
        requestAnimationFrame(() => loop());
    }
}