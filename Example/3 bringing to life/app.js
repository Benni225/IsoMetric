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
    var ressources = App.ressources, layers = App.layers, layer, bird, sky;
    // Lets add a new image-ressource...
    ressources.add("ourStripe", "../../images/bird/Bird-Stripe.png", IsoRessource.IMAGE);
    ressources.add("sky", "../../images/sky.jpg", IsoRessource.IMAGE);
    // ... and load it. After loading call "init()"
    ressources.load().then(function () { return init(); });
    // In this function we prepare our bird.
    function init() {
        // We add a new layer...
        layer = layers.add("layer");
        // ... and create a new animated sprite with our image.
        bird = layer.addAnimatedSprite("bird", ressources.get("ourStripe"), {
            tile: 1,
            size: { width: 717, height: 610 } //is the dimension of each frame in our stripe
        });
        // add our sky 
        sky = layer.addBillboard("sky", ressources.get("sky"));
        // set repeating type.
        sky.setRepeat(IsoBillboard.REPEAT);
        // Now we add an animation. In this animation we want to let our bird fly. 
        bird.addFrameAnimation("fly", [1, 2, 3, 4], 400, IsoEasing.QuadIn, IsoAnimation.PINGPONG);
        // Set the scale of the bird
        bird.setScale(0.1, 0.1);
        bird.setSpeed(8);
        // Set the position of the bird
        bird.position.set(50, 50);
        // We set the anchor of our bird in the center of the image.
        bird.anchor.set(Math.floor(bird.width / 2), Math.floor(bird.height / 2));
        // Now, we start playing our animation.
        bird.play("fly");
        App.physics.addMassBody(bird);
        // ... and call our gameloop.
        loop();
    }
    // This function is our gameloop.
    function loop() {
        // Checks whether a key ws pressed
        if (App.input.keyEventType === IsoInput.EVENT_KEYPRESS) {
            // If the space button was pressen and the position of our bird is higher than 50...
            if (App.input.keyCode === 32 && bird.getAbsolutePosition().y > 50) {
                // ... we let our bird jump up
                bird.move(0, -50);
                bird.rotation = bird.velocity.y;
            }
            else {
                // if the bird is in the near of the top of the screen, we move it a little bit down
                if (bird.getAbsolutePosition().y < 50 && bird.velocity.y < 0) {
                    bird.move(0, 1);
                }
            }
        }
        else {
            bird.rotation = bird.velocity.y;
        }
        // Scroll the sky.
        sky.scroll(-1, 0.5);
        App.physics.update();
        // We update our app and render our bird to the screen.
        App.update();
        App.canvas.context.fillStyle = "#333";
        App.canvas.context.font = "15px Arial";
        //Draw ing the FPS to the screen
        App.canvas.context.fillText("Press Space for flying", 20, 40);
        // We recall this function
        requestAnimationFrame(function () { return loop(); });
    }
};
//# sourceMappingURL=app.js.map