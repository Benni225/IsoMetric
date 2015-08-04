var Plugins = (function () {
    function Plugins(folder, core) {
        this.toLoad = 0;
        this.currentLoad = 0;
        this.folder = folder;
        this.Core = core;
    }
    Plugins.prototype.load = function (path) {
        var _this = this;
        if (path === undefined) {
            path = this.folder;
        }
        if (path[path.length - 1] !== "/") {
            path += "/";
        }
        var entries = Fs.readdirSync(__APPDIR__ + path);
        for (var i = 0; i < entries.length; i++) {
            var stats = Fs.lstatSync(__APPDIR__ + path + entries[i]);
            if (stats.isDirectory()) {
                this.load(path + entries[i]);
            }
            else if (stats.isFile()) {
                if (entries[i].substr(entries[i].length - 2).toLowerCase() === "js") {
                    this.toLoad++;
                    var src = document.createElement("script");
                    src.setAttribute("type", "text/javascript");
                    src.src = path + entries[i];
                    src.onload = function () { return _this.checkLoaded(); };
                    document.head.appendChild(src);
                }
            }
        }
    };
    Plugins.prototype.checkLoaded = function () {
        this.currentLoad++;
        if (this.toLoad === this.currentLoad) {
            FireEvent.fire("EditorPluginsLoaded");
        }
    };
    return Plugins;
})();
var Configuration = (function () {
    function Configuration(path) {
        this.path = path;
        this.load();
    }
    Configuration.prototype.load = function () {
        this.config = JSON.parse(Fs.readFileSync(this.path));
        FireEvent.fire("EditorConfigLoaded");
    };
    Configuration.prototype.get = function (property) {
        return this.config[property];
    };
    Configuration.prototype.set = function (property, value) {
        this.config[property] = value;
    };
    Configuration.prototype.save = function () {
        Fs.writeFile(this.path, JSON.stringify(this.config));
    };
    return Configuration;
})();
var __Plugin = (function () {
    function __Plugin() {
    }
    __Plugin.extend = function (name, instance) {
        __Plugin.prototype[name] = instance;
    };
    return __Plugin;
})();
var EditorCore = (function () {
    function EditorCore(path) {
        this.Plugins = {};
        this.Plugins = new __Plugin;
        this.configuration = new Configuration(path);
        this._plugins = new Plugins(this.configuration.get("pluginFolder"), this);
        this._plugins.load();
    }
    return EditorCore;
})();
var FireEvent = (function () {
    function FireEvent() {
    }
    FireEvent.fire = function (type, data, target) {
        var event = new CustomEvent(type);
        event.initCustomEvent(type, true, true, data);
        if (target !== undefined) {
            target.dispatchEvent(event);
        }
        else {
            document.dispatchEvent(event);
        }
    };
    return FireEvent;
})();
//# sourceMappingURL=core.js.map