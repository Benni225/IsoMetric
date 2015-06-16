///<reference path="../isometric.d.ts" />
var App: IsoMetric, firstLayer: IsoLayer;
window.onload = function () {
    App = new IsoMetric({
        fullscreen: true
    });

    App.layers.add("firstLayer");
    App.layers.getByName("firstLayer").tileMap.create(1920, 1920, 64, 64);
    App.tileSets.add("firstTileSet", "../images/ground.png");
    firstLayer = App.layers.getByName("firstLayer");
    firstLayer.zoomStrength = 0.1;
    App.tileSets.load().then(function () {
        firstLayer.tileMap.setTileSet(App.tileSets.getByName("firstTileSet"));
        firstLayer.tileMap.setScrollSpeed(8);

        gameExample1();
    });
} 

function gameExample1() {
    if (App.input.keyEventType === IsoInput.EVENT_KEYDOWN) {
        switch (App.input.keyCode) {
            case IsoInput.KEYUP:
                firstLayer.tileMap.setDeltaScroll(0, 1);
                break;
            case IsoInput.KEYDOWN:
                firstLayer.tileMap.setDeltaScroll(0, -1);
                break;
            case IsoInput.KEYLEFT:
                firstLayer.tileMap.setDeltaScroll(-1, 0);
                break;
            case IsoInput.KEYRIGHT:
                firstLayer.tileMap.setDeltaScroll(1, 0);
        }
    }
    if (App.input.mouseEventType === IsoInput.EVENT_MOUSEWHEEL) {
        App.layers.getByName("firstLayer").setZoom(App.input.mouseWheelDelta);
    }
    // Draw all the layers and sprites
    App.update();
    //After drawing the maps and sprites:
    App.canvas.context.fillStyle = "#fff";
    App.canvas.context.font = "14px Arial";
    //Draw ing the FPS to the screen
    App.canvas.context.fillText("FPS: " + App.FPS, 10, 30);
    App.canvas.context.fillText("Use the arrow-keys for scrolling and the mousewheel for zooming.", 10, 50);
    // Restart the game loop
    requestAnimationFrame(() => gameExample1());
};