var EditorListView = (function () {
    function EditorListView() {
        this.entries = new Array();
    }
    EditorListView.prototype.get = function () {
        if (this.element === undefined) {
            this.createElement();
        }
        return this.element;
    };
    EditorListView.prototype.add = function (name, object) {
        var _this = this;
        var count = this.countNames(name, this.entries);
        if (count !== 0) {
            name += "_" + count;
        }
        var e = this.addElement(name);
        this.element.appendChild(e);
        e.addEventListener("mouseup", function (event) { return _this.select(event); });
        this.entries.push({
            name: name,
            object: object,
            children: new Array(),
            selected: false,
            element: e
        });
        return this.entries[this.entries.length - 1];
    };
    EditorListView.prototype.addChildTo = function (entry, name, object) {
        var _this = this;
        var count = this.countNames(name, this.entries);
        if (count !== 0) {
            name += "_" + count;
        }
        var e = this.addElement(name);
        e.addEventListener("click", function (event) { return _this.select(event); });
        entry.element.appendChild(e);
        if (entry.children === undefined) {
            entry.children = new Array();
        }
        entry.children.push({
            name: name,
            object: object,
            children: new Array(),
            selected: false,
            element: e
        });
    };
    EditorListView.prototype.select = function (event, entryTree) {
        event.preventDefault();
        if (entryTree === undefined) {
            entryTree = this.entries;
        }
        for (var i = 0; i < entryTree.length; i++) {
            if (entryTree[i].element.querySelector("#text") !== event.target) {
                entryTree[i].selected = false;
                entryTree[i].element.querySelector("#text").classList.remove("highlight");
            }
            if (entryTree[i].element.querySelector("#text") === event.target) {
                entryTree[i].selected = true;
                entryTree[i].element.querySelector("#text").classList.add("highlight");
                FireEvent.fire("EditorEntrySelect", entryTree[i].object);
            }
            if (entryTree[i].children !== undefined && entryTree[i].children.length > 0) {
                this.select(event, entryTree[i].children);
            }
        }
    };
    EditorListView.prototype.unselect = function (event, entryTree) {
        if (event.defaultPrevented)
            return;
        if (entryTree === undefined) {
            entryTree = this.entries;
        }
        for (var i = 0; i < entryTree.length; i++) {
            entryTree[i].selected = false;
            entryTree[i].element.querySelector("#text").classList.remove("highlight");
            if (entryTree[i].children !== undefined && entryTree[i].children.length > 0) {
                this.unselect(event, entryTree[i].children);
            }
        }
        FireEvent.fire("EditorEntryUnselect");
    };
    EditorListView.prototype.countNames = function (search, a, count) {
        if (count === void 0) { count = 0; }
        var e = new RegExp(search);
        if (a !== undefined) {
            for (var i = 0; i < a.length; i++) {
                if (e.exec(a[i].name)) {
                    count++;
                }
                if (a[i].children !== undefined && a[i].children.length > 0) {
                    count = this.countNames(search, a[i].children, count);
                }
            }
        }
        return count;
    };
    EditorListView.prototype.getByName = function (name, entryTree) {
        if (entryTree === undefined) {
            entryTree = this.entries;
        }
        for (var i = 0; i < entryTree.length; i++) {
            if (entryTree[i].name === name) {
                return entryTree[i];
            }
            if (entryTree[i].children !== undefined && entryTree[i].children.length > 0) {
                var entry = this.getByName(name, entryTree[i].children);
                if (entry !== undefined) {
                    return entry;
                }
            }
        }
    };
    EditorListView.prototype.getByData = function (data, entryTree) {
        if (entryTree === undefined) {
            entryTree = this.entries;
        }
        for (var i = 0; i < entryTree.length; i++) {
            if (entryTree[i].object === data) {
                return entryTree[i];
            }
            if (entryTree[i].children !== undefined && entryTree[i].children.length > 0) {
                var entry = this.getByData(data, entryTree[i].children);
                if (entry !== undefined) {
                    return entry;
                }
            }
        }
    };
    EditorListView.prototype.getSelected = function (entryTree) {
        if (entryTree === undefined) {
            entryTree = this.entries;
        }
        for (var i = 0; i < entryTree.length; i++) {
            if (entryTree[i].selected === true) {
                return entryTree[i];
            }
            if (entryTree[i].children !== undefined && entryTree[i].children.length > 0) {
                var entry = this.getSelected(entryTree[i].children);
                if (entry !== undefined) {
                    return entry;
                }
            }
        }
    };
    EditorListView.prototype.createElement = function () {
        var _this = this;
        this.element = document.createElement("div");
        this.element.style.width = "100%";
        this.element.style.height = "100%";
        this.element.style.display = "inline-block";
        this.element.id = "list";
        this.element.style.padding = "5px";
        this.element.style.overflowY = "auto";
        this.element.style.overflowX = "hidden";
        this.element.addEventListener("mouseup", function (event) { return _this.unselect(event); });
    };
    EditorListView.prototype.addElement = function (name) {
        var e = document.createElement("div");
        e.style.marginLeft = "10px";
        e.style.width = "100%";
        e.style.display = "inline-block";
        e.style.cursor = "pointer";
        var text = document.createElement("div");
        text.innerHTML = name;
        text.style.fontSize = "12px";
        text.style.display = "inline";
        text.style.height = "16px";
        text.id = "text";
        text.style.lineHeight = "16px";
        text.style.padding = "2px";
        e.appendChild(text);
        return e;
    };
    return EditorListView;
})();
//# sourceMappingURL=EditorListView.js.map