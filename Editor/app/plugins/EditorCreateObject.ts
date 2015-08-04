interface EditorAddToolbarButtons{
    name: string;
    element: HTMLElement;
}

class EditorCreateObjects {
    listView: EditorListView;
    Engine: IsoMetric;
    buttons: Array<EditorAddToolbarButtons> = new Array();

    constructor(listView: EditorListView, Engine: IsoMetric) {
        this.listView = listView;
        this.Engine = Engine;

        document.addEventListener("EditorEntrySelect", (event: CustomEvent) => this.entrySelected(event), true);
        document.addEventListener("EditorEntryUnselect", (event: CustomEvent) => this.entryUnselected(event), true);

        this.init();
    }

    init() {
        this.addButton("layer", "New Layer", "inline-block", (event) => this.addLayer(event));
        this.addButton("object", "New Object", "none", (event: MouseEvent) => this.addObject(event));
        this.addButton("sprite", "New Sprite", "none", (event) => this.addLayer(event));
        this.addButton("tilemap", "New Tilemap", "none", (event) => this.addLayer(event));

        var e = document.createElement("div");
        for (var i = 0; i < this.buttons.length; i++) {
            e.appendChild(this.buttons[i].element);
        }

        layout.setContentOf("addToolbar", e);
    }

    private addButton(name: string, text: string, visibility: string, onClick: EventListener) {
        var button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", onClick);
        button.style.display = visibility;
        this.buttons.push({
            name: name,
            element: button
        });
    }

    private entrySelected(event: CustomEvent) {
        this.hideInfos();
        if (event.detail instanceof IsoLayer) {
            this.showInfos(event.detail);
            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].name === "layer") {
                    this.buttons[i].element.style.display = "none";
                } else {
                    this.buttons[i].element.style.display = "inline-block";
                }
            }
        } else {
            this.showInfos({sample: true});
            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].name === "layer") {
                    this.buttons[i].element.style.display = "inline-block";
                } else {
                    this.buttons[i].element.style.display = "none";
                }
            }
        }
    }

    private showInfos(object: IsoObject|IsoSprite|IsoAnimatedSprite|IsoTileMap|IsoLayer|any) {
        if (object !== undefined) {
            var e = document.createElement("div");
            e.id = "objectInfo";
            e.style.overflowY = "auto";
            // Show Layer-Info
            if (object instanceof IsoLayer) {
                var type = document.createElement("div");
                type.style.width = "100%";
                type.style.display = "block";
                type.innerHTML = "<div style='display: inline-block; width: 20%;'>Type: </div><div style='width: 75%; display: inline-block;'>Layer</div>";
                e.appendChild(type);
                var name = document.createElement("div");
                name.style.width = "100%";
                name.style.display = "block";
                name.style.marginTop = "10px";
                name.innerHTML = "<div style='display: inline-block; width: 20%;'>Name: </div><input type='text' value='" + object.name + "' style='width: 75%; display: inline-block;' />";
                e.appendChild(name);
            } else {
                e.textContent = "Showing the object-info";
            }
            e.style.marginTop = "10px";
            e.style.width = "100%";
            var t = layout.getFrameByName("addToolbar");
            t.element.appendChild(e);
        }
    }

    private hideInfos() {
        var e = layout.getFrameByName("addToolbar");
        var i = e.element.querySelector("#objectInfo");
        if (i !== undefined && i !== null) {
            i.remove();
        }
    }

    private entryUnselected(event: CustomEvent) {
        this.hideInfos();
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].name === "layer") {
                this.buttons[i].element.style.display = "inline-block";
            } else {
                this.buttons[i].element.style.display = "none";
            }
        }
    }

    addObject(event: MouseEvent) {
        var layer = this.listView.getSelected();
        var name = "Object";
        // this.Engine.layers.get(layer.name).addObject()
        this.listView.addChildTo(layer, name);
    }

    addLayer(event) {
        var name = "Layer";
        var entry = this.listView.add(name);
        this.Engine.layers.add(entry.name)
        entry.object = this.Engine.layers.get(entry.name)
    }
}