///<reference path="../isometric.d.ts" />
var App: IsoMetric, firstLayer: IsoLayer;
window.onload = function () {
    App = new IsoMetric({
        fullscreen: true
    });

    App.layers.add("firstLayer", 1920, 1920, 64, 64);
    App.tileSets.add("firstTileSet", "../images/ground.png");
    firstLayer = App.layers.getByName("firstLayer");

    App.tileSets.load().then(function () {
        firstLayer.setTileSet(App.tileSets.getByName("firstTileSet"));
        firstLayer.setScrollSpeed(8);

        gameExample1();
    });
} 

function gameExample1() {
    if (App.input.keyEventType === IsoInput.EVENT_KEYDOWN) {
        switch (App.input.keyCode) {
            case IsoInput.KEYUP:
                firstLayer.setDeltaScroll(0, 1);
                break;
            case IsoInput.KEYDOWN:
                firstLayer.setDeltaScroll(0, -1);
                break;
            case IsoInput.KEYLEFT:
                firstLayer.setDeltaScroll(-1, 0);
                break;
            case IsoInput.KEYRIGHT:
                firstLayer.setDeltaScroll(1, 0);
        }
    }
    // Draw all the layers and sprites
    App.update();
    //After drawing the maps and sprites:
    App.canvas.context.fillStyle = "#fff";
    App.canvas.context.font = "20px Arial";
    //Draw ing the FPS to the screen
    App.canvas.context.fillText("FPS: " + App.FPS, 10, 30);
    // Restart the game loop
    requestAnimationFrame(() => gameExample1());
};