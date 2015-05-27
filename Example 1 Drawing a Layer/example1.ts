///<reference path="../isometric.d.ts" />
window.onload = function () {
    var App = new IsoMetric({
        fullscreen: true
    });

    App.layers.add("firstLayer", 1920, 1920, 64, 64);
    App.tileSets.add("firstTileSet", "../images/ground.png");
    var firstLayer = App.layers.getByName("firstLayer");
    App.tileSets.load().then(function () {
        firstLayer.setTileSet(App.tileSets.getByName("firstTileSet"));
        firstLayer.setScrollSpeed(8);

        App.input.onKeyboard = function () {
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

        App.startLoop();
    });
} 