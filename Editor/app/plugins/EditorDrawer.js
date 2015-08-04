var EditorDrawer = (function () {
    function EditorDrawer(Engine) {
        this.Engine = Engine;
    }
    EditorDrawer.prototype.drawLoop = function () {
        var _this = this;
        this.Engine.update();
        window.requestAnimationFrame(function () { return _this.drawLoop; });
    };
    return EditorDrawer;
})();
//# sourceMappingURL=EditorDrawer.js.map