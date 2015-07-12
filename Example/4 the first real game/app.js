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
    var ressources = App.ressources, layers = App.layers, layer, bird, sky, score = 0, enemies = new Array(), newEnemyInterval;
    // Lets add a new image-ressource...
    ressources.add("ourStripe", "../../images/bird/Bird-Stripe.png", IsoRessource.IMAGE);
    ressources.add("enemy", "../../images/bird/Bird2-Stripe.png", IsoRessource.IMAGE);
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
        // the animation if the bird crashes
        bird.addAnimation("r", "rotation", -359, 500, IsoEasing.ExpoInOut, IsoAnimation.ENDLESS);
        // add our sky 
        sky = layer.addBillboard("sky", ressources.get("sky"));
        // set repeating type.
        sky.setRepeat(IsoBillboard.REPEAT);
        // Now we add an animation. In this animation we want to let our bird fly. 
        bird.addFrameAnimation("fly", [1, 2, 3, 4], 400, IsoEasing.QuadIn, IsoAnimation.PINGPONG);
        // Set the scale of the bird
        bird.setScale(0.1, 0.1);
        // Set the moving speed of the bird
        bird.setSpeed(8);
        // Set the position of the bird
        bird.setPosition({ x: 50, y: 50 });
        // We set the anchor of our bird in the center of the image.
        bird.setAnchor(Math.floor(bird.width / 2), Math.floor(bird.height / 2));
        // Now, we start playing our animation.
        bird.play("fly");
        // Give the bird a mass, so we can use physics
        App.physics.addMassBody(bird);
        // in a random time the first enemy will be created
        newEnemyInterval = setInterval(function () { return createEnemy(); }, getRValue(1000, 3000));
        // ... and call our gameloop.
        loop();
    }
    // This function is our gameloop.
    function loop() {
        // Control the enemies
        if (enemies.length > 0) {
            for (var i = 1; i < enemies.length; i++) {
                enemies[i].move(-1, 0);
                // if the bird collides with an enemy
                if (enemies[i].collide(bird)) {
                    // we set the bird as hit
                    bird.setProperty("hit", true);
                    // ... and rotate it.
                    bird.play("r");
                }
                // If our bird passed an enemy we get a point
                if (enemies[i].getAbsolutePosition().x < bird.getAbsolutePosition().x && enemies[i].getProperty("score") !== true) {
                    enemies[i].setProperty("score", true);
                    score++;
                }
            }
        }
        // Checks whether a key ws pressed
        if (App.input.keyEventType === IsoInput.EVENT_KEYPRESS) {
            // If the space button was pressen and the position of our bird is higher than 50...
            if (App.input.keyCode === 32 && bird.getAbsolutePosition().y > 50 && bird.getProperty("hit") !== true) {
                // ... we let our bird jump up
                bird.move(0, -50);
                bird.rotation = bird.velocity.y;
            }
        }
        else {
            // if the bird is in the near of the top of the screen, we move it a little bit down
            if (bird.getAbsolutePosition().y < 50 && bird.velocity.y < 0) {
                bird.move(0, 1);
            }
            if (bird.getProperty("hit") !== true)
                bird.rotation = bird.velocity.y;
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
        //Draw the scroe to the screen
        App.canvas.context.fillStyle = "#333";
        App.canvas.context.font = "20px Arial";
        //Draw ing the FPS to the screen
        App.canvas.context.fillText("Score: " + score, 20, 60);
        // We recall this function
        requestAnimationFrame(function () { return loop(); });
    }
    function gameover() {
        // Control the enemies
        if (enemies.length > 0) {
            for (var i = 1; i < enemies.length; i++) {
                enemies[i].move(-1, 0);
            }
        }
        if (App.input.keyEventType === IsoInput.EVENT_KEYPRESS) {
            // Reset the game
            for (var i = 0; i < enemies.length; i++) {
                enemies[i].hidden = true;
            }
            enemies = new Array();
            bird.setPosition({ x: 50, y: 50 });
            bird.setProperty("hit", false);
            bird.velocity.y = 0;
            score = 0;
            clearInterval(newEnemyInterval);
            newEnemyInterval = setInterval(function () { return createEnemy(); }, getRValue(1000, 3000));
            bird.stop("r");
            bird.rotation = 0;
            bird.hidden = false;
            requestAnimationFrame(function () { return loop(); });
            return;
        }
        sky.scroll(-1, 0.5);
        App.update();
        App.canvas.context.fillStyle = "#333";
        App.canvas.context.font = "15px Arial";
        //Draw ing the FPS to the screen
        App.canvas.context.fillText("Press Space for flying", 20, 40);
        App.canvas.context.fillStyle = "#333";
        App.canvas.context.font = "35px Arial";
        //Draw ing the FPS to the screen
        App.canvas.context.fillText("Game Over", window.innerWidth / 2 - 120, window.innerHeight / 2 - 40);
        App.canvas.context.fillText("Your score: " + score, window.innerWidth / 2 - 135, window.innerHeight / 2 + 5);
        App.canvas.context.font = "15px Arial";
        App.canvas.context.fillText("Press any key for restart", window.innerWidth / 2 - 110, window.innerHeight / 2 + 50);
        requestAnimationFrame(function () { return gameover(); });
    }
    function createEnemy() {
        var enemy = layer.addAnimatedSprite("enemy" + enemies.length, ressources.get("enemy"), {
            tile: 1,
            size: { width: 717, height: 610 }
        });
        var newY = getRValue(70, window.innerHeight / 2);
        var newYEnd = getRValue(70, window.innerHeight / 2);
        enemy.addFrameAnimation("fly", [1, 2, 3, 4], 400, IsoEasing.QuadIn, IsoAnimation.PINGPONG).play("fly");
        enemy.setSpeed(getRValue(5, 15));
        enemy.setScale(0.1, 0.1);
        enemy.setPosition({ x: window.innerWidth + 50, y: newY });
        enemy.addAnimation("updown", "position.y", newYEnd, getRValue(500, 2000), IsoEasing.SineIn, IsoAnimation.PINGPONG).play("updown");
        enemies.push(enemy);
    }
    function getRValue(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};
//# sourceMappingURL=app.js.map