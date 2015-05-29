# IsoMetric
IsoMetric is a tilebased game engine for JavaScript and HTML5 written in TypeScript. Just have a look to the examples
and see how simple it is. At the moment you see an early preview of the functionality of IsoMetric. In the next time
many features will be added. IsoMetric is fast, simple and flexible.

### Features
* unlimited layers
* unlimited tilesets
* scrolling
* sprites
* billboards
* collision detection
* keyboard and mouse (touch support at the moment under development)
* tilemaps
* sprite animations
* heightmaps

### Some of the planned features
* shadowmaps
* isometric drawing
* animated tilemaps
* pathfinding
* rotation
* zooming
* and many more

## Setting up IsoMetric in JavaScript
1. Include the source
```
<script src="../IsoMetric.js"></script>
```
2. Start a project
```
<script>
var app;
window.onload = function(){
  app = new IsoMetric({
    width: 640,
    height: 480,
    fullscreen: false
  });
  // do what you want
  ...
  // start the game
  gameLoop();
  
};
  
function gameLoop(){
  // do your stuff
  ...
  //render all
  app.update();
  // restart the gameloop
  requestAnimationFrame(function () { return gameLoop(); });
}
</script>
```

## Setting up IsoMetric in TypeScript
1. Add the reference
```
///<reference path="isometric.d.ts" />
```

2. Start your code
```
var app: IsoMetric;
window.onload = function(){
  app = new IsoMetric({
    width: 640,
    height: 480,
    fullscreen: false
  });
  // do what you want
  ...
  // start the game
  gameLoop();
}
  
function gameLoop(){
  // do your stuff
  ...
  // render all
  app.update();
  // restart the gameloop
  requestAnimationFrame(() => gameLoop());
}
```

