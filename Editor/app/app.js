///<reference path="core/node.d.ts" />
///<reference path="core/core.ts" />
///<reference path="core/jquery.d.ts" />
///<reference path="core/jqueryui.d.ts" />
///<reference path="core/jquery.layout.d.ts" />
///<reference path="core/isometric.d.ts" />
var __APPDIR__ = "./app/";
var NwGui = require("nw.gui"), Win = NwGui.Window.get(), Fs = require("fs"), Core, layout, drawer, Engine;
window.onload = function () {
    Win.maximize();
    init();
};
function init() {
    document.addEventListener("EditorPluginsLoaded", function () { return initGUI(); });
    Core = new EditorCore(__APPDIR__ + "config.json");
    Engine = new IsoMetric();
}
function initGUI() {
    layout = new EditorLayout();
    layout.create([
        {
            name: "toolbar",
            top: "0%",
            left: "0%",
            width: "100%",
            height: "5%"
        },
        {
            name: "main",
            top: "5%",
            left: "0%",
            width: "80%",
            height: "80%",
            class: "frame"
        },
        {
            name: "inspector",
            top: "5%",
            left: "80%",
            width: "20%",
            height: "70%",
            minWidth: "20%",
            class: "frame"
        },
        {
            name: "addToolbar",
            top: "75%",
            left: "80%",
            width: "20%",
            height: "25%",
            class: "frame",
            styles: [["padding", "5px"]]
        }]);
    layout.addBorderTo("main", "right", new Array("inspector", "addToolbar"));
    layout.setContentOf("main", Engine.canvas.canvasElement);
    drawer = new EditorDrawer(Engine);
    createAddToolBar();
}
function createAddToolBar() {
    var list = new EditorListView();
    var create = new EditorCreateObjects(list, Engine);
    layout.setContentOf("inspector", list.get());
}
//# sourceMappingURL=app.js.map