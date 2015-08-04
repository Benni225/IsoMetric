class EditorDrawer {
    Engine: IsoMetric;

    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    drawLoop() {
        this.Engine.update();
        window.requestAnimationFrame(() => this.drawLoop);
    }
}