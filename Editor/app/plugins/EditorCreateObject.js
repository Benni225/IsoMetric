var EditorCreateObjects = (function () {
    function EditorCreateObjects(listView, Engine) {
        var _this = this;
        this.buttons = new Array();
        this.listView = listView;
        this.Engine = Engine;
        document.addEventListener("EditorEntrySelect", function (event) { return _this.entrySelected(event); }, true);
        document.addEventListener("EditorEntryUnselect", function (event) { return _this.entryUnselected(event); }, true);
        this.init();
    }
    EditorCreateObjects.prototype.init = function () {
        var _this = this;
        this.addButton("layer", "New Layer", "inline-block", function (event) { return _this.addLayer(event); });
        this.addButton("object", "New Object", "none", function (event) { return _this.addObject(event); });
        this.addButton("sprite", "New Sprite", "none", function (event) { return _this.addLayer(event); });
        this.addButton("tilemap", "New Tilemap", "none", function (event) { return _this.addLayer(event); });
        var e = document.createElement("div");
        for (var i = 0; i < this.buttons.length; i++) {
            e.appendChild(this.buttons[i].element);
        }
        layout.setContentOf("addToolbar", e);
    };
    EditorCreateObjects.prototype.addButton = function (name, text, visibility, onClick) {
        var button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", onClick);
        button.style.display = visibility;
        this.buttons.push({
            name: name,
            element: button
        });
    };
    EditorCreateObjects.prototype.entrySelected = function (event) {
        this.hideInfos();
        if (event.detail instanceof IsoLayer) {
            this.showInfos(event.detail);
            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].name === "layer") {
                    this.buttons[i].element.style.display = "none";
                }
                else {
                    this.buttons[i].element.style.display = "inline-block";
                }
            }
        }
        else {
            this.showInfos({ sample: true });
            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].name === "layer") {
                    this.buttons[i].element.style.display = "inline-block";
                }
                else {
                    this.buttons[i].element.style.display = "none";
                }
            }
        }
    };
    EditorCreateObjects.prototype.showInfos = function (object) {
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
            }
            else {
                e.textContent = "Showing the object-info";
            }
            e.style.marginTop = "10px";
            e.style.width = "100%";
            var t = layout.getFrameByName("addToolbar");
            t.element.appendChild(e);
        }
    };
    EditorCreateObjects.prototype.hideInfos = function () {
        var e = layout.getFrameByName("addToolbar");
        var i = e.element.querySelector("#objectInfo");
        if (i !== undefined && i !== null) {
            i.remove();
        }
    };
    EditorCreateObjects.prototype.entryUnselected = function (event) {
        this.hideInfos();
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].name === "layer") {
                this.buttons[i].element.style.display = "inline-block";
            }
            else {
                this.buttons[i].element.style.display = "none";
            }
        }
    };
    EditorCreateObjects.prototype.addObject = function (event) {
        var layer = this.listView.getSelected();
        var name = "Object";
        // this.Engine.layers.get(layer.name).addObject()
        this.listView.addChildTo(layer, name);
    };
    EditorCreateObjects.prototype.addLayer = function (event) {
        var name = "Layer";
        var entry = this.listView.add(name);
        this.Engine.layers.add(entry.name);
        entry.object = this.Engine.layers.get(entry.name);
    };
    return EditorCreateObjects;
})();
//# sourceMappingURL=EditorCreateObject.js.map