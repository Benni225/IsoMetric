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
            tile: 1, //sets first frame in our sprite
            size: { width: 717, height: 610 } //is the dimension of each frame in our stripe
        });

        // add our sky 
        sky = layer.addBillboard("sky", ressources.get("sky"));
        // set repeating type.
        sky.setRepeat(IsoBillboard.REPEAT);
        // Now we add an animation. In this animation we want to let our bird fly. 
        bird.addFrameAnimation("fly", [1, 2, 3, 4], 400, IsoEasing.QuadIn, IsoAnimation.PINGPONG);
        // Add two more animations
        bird.addAnimation("rotateup", "rotation", -30, 500, IsoEasing.ExpoIn);
        bird.addAnimation("rotatedown", "rotation", 30, 500, IsoEasing.ExpoIn);

        // Set the scale of the bird
        bird.setScale(0.1,0.1);

        bird.setSpeed(8);

        // Set the position of the bird
        bird.setPosition({x: 50, y: 50});

        // We set the anchor of our bird in the center of the image.
        bird.setAnchor(Math.floor(bird.width / 2), Math.floor(bird.height / 2));

        // Now, we start playing our animation.
        bird.play("fly");


        App.physics.addMassBody(bird);
        // ... and call our gameloop.
        loop();
    }
    // This function is our gameloop.
    function loop() {
        var loopFunction = loop;
        // Checks whether a key ws pressed
        if (App.input.keyEventType === IsoInput.EVENT_KEYPRESS) {
            // If the space button was pressen and the position of our bird is higher than 50...
            if (App.input.keyCode === 32 && bird.getAbsolutePosition().y > 50) {
                // ... we let our bird jump up
                bird.move(0, -50);
                // and play under some conditions the "rotateup" animation
                if (!bird.isPlaying("rotateup") && bird.rotation > -30 && bird.velocity.y < 0) {
                    if (bird.isPlaying("rotatedown"))
                        bird.stop("rotatedown");
                    bird.play("rotateup");
                }
            } else {
                // if the bird is in the near of the top of the screen, we move it a little bit down
                if (bird.getAbsolutePosition().y < 50 && bird.velocity.y < 0) {
                    bird.move(0, 1);
                }
            }
        } else {
            // ... else we play under some connditions the "rotatedown" animation
            if (!bird.isPlaying("rotatedown") && bird.rotation < 30 && bird.velocity.y > 0) {
                if (bird.isPlaying("rotateup"))
                    bird.stop("rotateup");
                bird.play("rotatedown");
            }
        }
        // If the birds position is higher than the screenheight - game over
        if (bird.getAbsolutePosition().y > window.innerHeight) {
            // Hide the bird
            bird.hidden = true;
            gameover();
            return;
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
        requestAnimationFrame(() => loop());
    }

    function gameover() {
        sky.scroll(-1, 0.5);
        App.update();

        App.canvas.context.fillStyle = "#333";
        App.canvas.context.font = "15px Arial";
        //Draw ing the FPS to the screen
        App.canvas.context.fillText("Press Space for flying", 20, 40);

        App.canvas.context.fillStyle = "#333";
        App.canvas.context.font = "35px Arial";
        //Draw ing the FPS to the screen
        App.canvas.context.fillText("Game Over", window.innerWidth / 2 - 120, window.innerHeight / 2 - 15);

        requestAnimationFrame(() => gameover());
    }
}