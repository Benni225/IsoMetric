class Plugins {
    folder: string;
    Core: EditorCore;
    toLoad: number = 0;
    currentLoad: number = 0;
    constructor(folder: string, core: EditorCore) {
        this.folder = folder;
        this.Core = core;
    }

    load(path?: string) {
        if (path === undefined) {
            path = this.folder;
        }
        if (path[path.length - 1] !== "/") {
            path += "/";
        }
        var entries: Array<string> = Fs.readdirSync(__APPDIR__  + path);
        for (var i = 0; i < entries.length; i++) {
            var stats = Fs.lstatSync(__APPDIR__  + path + entries[i]);
            if (stats.isDirectory()) {
                this.load(path + entries[i]);
            } else if (stats.isFile()) {
                if (entries[i].substr(entries[i].length - 2).toLowerCase() === "js") {
                    this.toLoad++;
                    var src = document.createElement("script");
                    src.setAttribute("type", "text/javascript");
                    src.src = path + entries[i];
                    src.onload = () => this.checkLoaded();
                    document.head.appendChild(src);
                }
            }
        }
    }

    checkLoaded() {
        this.currentLoad++;
        if (this.toLoad === this.currentLoad) {
            FireEvent.fire("EditorPluginsLoaded");
        }
    }
}

class Configuration {
    path: string;
    config: Object;
    constructor(path: string) {
        this.path = path;
        this.load();
    }

    load() {
        this.config = JSON.parse(Fs.readFileSync(this.path));
        FireEvent.fire("EditorConfigLoaded");
    }

    get(property: string) {
        return this.config[property];
    }

    set(property: string, value: any) {
        this.config[property] = value;
    }

    save() {
        Fs.writeFile(this.path, JSON.stringify(this.config));
    }
}

class __Plugin {
    static extend(name, instance) {
        __Plugin.prototype[name] = instance;
    }
}

class EditorCore {
    _plugins: Plugins;
    Plugins: Object = {};
    configuration: Configuration;
    constructor(path: string) {
        this.Plugins = new __Plugin;
        this.configuration = new Configuration(path);
        this._plugins = new Plugins(this.configuration.get("pluginFolder"), this);
        this._plugins.load();
    }
}

class FireEvent {
    static fire(type: string, data?: Object, target?: HTMLElement) {
        var event = new CustomEvent(type);
        event.initCustomEvent(type, true, true, data);
        if (target !== undefined) {
            target.dispatchEvent(event);
        } else {
            document.dispatchEvent(event);
        }
    }
}