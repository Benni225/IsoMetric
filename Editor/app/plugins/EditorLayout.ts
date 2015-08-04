interface mouseMoveEvent extends JQueryEventObject {
    startY: number;
    deltaY: number;
    startX: number;
    deltaX: number;
    velocityX: number;
    velocityY: number;
}

interface frameStyle {
    name: string;
    width: string;
    height: string;
    minWidth?: string;
    minHeight?: string;
    top: string;
    left: string;
    class?: string;
    styles?: Array<Array<string>>;
}

interface borderStyle {
    width: string;
    height: string;
    top: string;
    left: string;
    class?: string;
    styles?: Array<Array<string>>;
}

interface layoutFrame {
    name: string;
    element: HTMLElement;
    style: frameStyle;
    borders?: Array<layoutBorder>;
    xPos2: number;
    yPos2: number;
}

interface layoutBorder {
    element: HTMLElement;
    effects: Array<layoutFrame>;
    parent: layoutFrame;
    position: string;
    move: boolean;
}

interface layoutMouse {
    oldPositionX: number;
    oldPositionY: number;
    positionX: number;
    positionY: number;
    deltaX: number;
    deltaY: number;
    eventType: string;
    event?: MouseEvent;
}

class EditorLayout {
    frames: Array<layoutFrame> = new Array();
    mainContent = "#mainContent";
    mouse: layoutMouse = { oldPositionX: 0, oldPositionY: 0, deltaX: 0, deltaY: 0, eventType: "", positionX: 0, positionY: 0 };
    currentMovingBorder: layoutBorder;
    constructor() {
        window.onresize = () => this.recalculateFrames();
    }
    /**
     * Create a new layout frame.
     */
    create(frames: Array<frameStyle>) {
        for (var i = 0; i < frames.length; i++) {
            var f = frames[i];
            var e = document.createElement("div");

            this.styleFrame(e, f);
            this.frames.push({
                style: f,
                element: e,
                name: f.name,
                xPos2: parseInt(e.style.left) + parseInt(e.style.width),
                yPos2: parseInt(e.style.top)
            });

            document.querySelector(this.mainContent).appendChild(e);
        }
    }

    private styleFrame(element: HTMLElement, style: frameStyle) {
        element.style.width = this.calculateValue(style.width, window.innerWidth);
        element.style.height = this.calculateValue(style.height, window.innerHeight);
        element.style.top = this.calculateValue(style.top, window.innerHeight);
        element.style.left = this.calculateValue(style.left, window.innerWidth);
        element.style.position = "absolute";
        element.style.display = "block";
        element.style.zIndex = "100";
        element.style.boxSizing = "border-box";
        element.id = style.name;

        if (style.minWidth !== undefined)
            element.style.minWidth = this.calculateValue(style.minWidth, window.innerWidth);
        if (style.minHeight !== undefined)
            element.style.minHeight = this.calculateValue(style.minHeight, window.innerHeight);

        if (style.class !== undefined) {
            element.classList.add(style.class);
        }

        if (style.styles !== undefined) {
            for (var si = 0; si < style.styles.length; si++) {
                element.style[style.styles[si][0]] = style.styles[si][1];
            }
        }
    }

    setMouseEvent(event: MouseEvent) {
        this.mouse.event = event;
        this.mouse.eventType = event.type
        this.mouse.deltaX = 0;
        this.mouse.deltaY = 0;
        if (this.getBorderByElement(event.target) !== undefined) {
            if (event.type === "mousedown" && this.getBorderByElement(event.target).move === false) {
                console.log(this.getBorderByElement(event.target));
                this.getBorderByElement(event.target).move = true;
                this.currentMovingBorder = this.getBorderByElement(event.target);
                document.addEventListener("mousedown", (event: MouseEvent) => this.setMouseEvent(event));
                document.addEventListener("mouseup", (event: MouseEvent) => this.setMouseEvent(event));
                document.addEventListener("mousemove", (event: MouseEvent) => this.setMousePosition(event));
                this.positionBorder();
                event.stopPropagation();
            } else if (event.type === "mouseup") {
                this.getBorderByElement(event.target).move = false;
            }
        }
    }

    setMousePosition(event: MouseEvent) {
        this.mouse.deltaX = event.pageX - this.mouse.oldPositionX;
        this.mouse.deltaY = event.pageY - this.mouse.oldPositionY;
        this.mouse.oldPositionX = this.mouse.positionX;
        this.mouse.oldPositionY = this.mouse.positionY;
        this.mouse.positionX = event.pageX;
        this.mouse.positionY = event.pageY;
        this.mouse.event = event;
    }

    addBorderTo(parentName: string, position: string, effects: Array<string>, className?: string) {
        var e = document.createElement("div"),
            parent = this.getFrameByName(parentName);
        this.styleBorder(e, parent, position);

        if (className !== undefined) {
            e.className = className;
        }

        e.addEventListener("mousedown", (event: MouseEvent) => this.setMouseEvent(event));
        e.addEventListener("mouseup", (event: MouseEvent) => this.setMouseEvent(event));
        e.addEventListener("mousemove", (event: MouseEvent) => this.setMousePosition(event));

        var effectsElements: Array<layoutFrame> = new Array();

        for (var i = 0; i < effects.length; i++) {
            var name = effects[i];
            for (var p = 0; p < this.frames.length; p++) {
                if (this.frames[p].name === name) {
                    effectsElements.push(this.frames[p]);
                }
            }
        }
        if (parent.borders === undefined) {
            parent.borders = new Array();
        }
        parent.borders.push({
            element: e,
            effects: effectsElements,
            position: position,
            parent: parent,
            move: false
        });

        document.querySelector(this.mainContent).appendChild(e);
    }

    private styleBorder(element: HTMLElement, parent: layoutFrame, position: string) {
        element.style.position = "absolute";
        element.style.display = "block";
        element.style.zIndex = "100";
        if (position === "left" || position === "right") {
            element.style.width = "8px";
            element.style.height = parent.element.style.height;
            element.style.cursor = "ew-resize";
            if (position === "right") {
                element.style.top = parent.element.style.top;
                element.style.left = (parseInt(parent.element.style.left) + parseInt(parent.element.style.width)).toString() + "px";
                parent.element.style.width = (parseInt(parent.element.style.width) - 8).toString() + "px";
            }
            if (position === "left") {
                element.style.top = parent.element.style.top;
                element.style.left = (parseInt(parent.element.style.left)).toString() + "px";
                parent.element.style.left = (parseInt(parent.element.style.left) + 8).toString() + "px";
                parent.element.style.width = (parseInt(parent.element.style.width) - 8).toString() + "px";
            }
        } else {
            element.style.width = parent.element.style.width;
            element.style.height = "8px";
            element.style.cursor = "ns-resize";
            if (position === "top") {
                element.style.left = parent.element.style.left;
                element.style.top = (parseInt(parent.element.style.top) - 8).toString() + "px";
            }
            if (position === "down") {
                element.style.left = parent.element.style.left;
                parent.element.style.width = (parseInt(parent.element.style.height) - 8).toString() + "px";
                element.style.top = (parseInt(parent.element.style.top) + parseInt(parent.element.style.height)).toString() + "px";
            }
        }
    }

    private recalculateFrames() {
        for (var i = 0; i < this.frames.length; i++) {
            this.styleFrame(this.frames[i].element, this.frames[i].style);
            if (this.frames[i].borders !== undefined) {
                for (var p = 0; p < this.frames[i].borders.length; p++) {
                    this.styleBorder(this.frames[i].borders[p].element, this.frames[i], this.frames[i].borders[p].position);
                }
            }
        }
    }

    private calculateValue(s: string, reference: number): string {
        if (s.replace("%", "") !== s) {
            var onePercent = reference / 100;
            return (onePercent * parseInt(s.replace("%", ""), 10)).toFixed(0) + "px";
        } else {
            return s;
        }
    }
    /**
     * Sets the content of a layout frame. Returns true for success. Else false.
     */
    setContentOf(name: string, content: HTMLElement|string): boolean {
        for (var i = 0; i < this.frames.length; i++) {
            if (this.frames[i].name === name) {
                this.frames[i].element.innerHTML = "";
                if (typeof content === "object") {
                    if (parseInt(content.getAttribute("width")) > parseInt(this.frames[i].element.style.width, 10)) {
                        content.setAttribute("width", parseInt(this.frames[i].element.style.width) - 2 + "px");
                    }
                    if (parseInt(content.getAttribute("height")) > parseInt(this.frames[i].element.style.height, 10)) {
                        content.setAttribute("height", parseInt(this.frames[i].element.style.height) - 2 + "px");
                    }
                    if (parseInt(content.style.width) > parseInt(this.frames[i].element.style.width, 10)) {
                        content.style.width = parseInt(this.frames[i].element.style.width) - 2 + "px";
                    }
                    if (parseInt(content.style.height) > parseInt(this.frames[i].element.style.height, 10)) {
                        content.style.height = parseInt(this.frames[i].element.style.height) - 2 + "px";
                    }
                    this.frames[i].element.appendChild(content);
                }else if (typeof content === "string") {
                    this.frames[i].element.innerHTML = content;
                }
                return true;
            }
        }

        return false;
    }
    /** 
     * Appends content to a layout frame. Returns true for success. Else false.
     */
    appendContentOf(name: string, content: HTMLElement|string): boolean {
        for (var i = 0; i < this.frames.length; i++) {
            if (this.frames[i].name === name) {
                if (typeof content === "HTMLElement")
                    this.frames[i].element.appendChild(content);
                else if (typeof content === "string") {
                    this.frames[i].element.innerHTML += content;
                }
                return true;
            }
        }

        return false;
    }
    /**
     * Removes content from a layout frame. Returns true for success. Else false.
     */
    removeContentOf(name: string, content: HTMLElement|string): boolean {
        for (var i = 0; i < this.frames.length; i++) {
            if (this.frames[i].name === name) {
                if (typeof content === "HTMLElement")
                    this.frames[i].element.removeChild(content);
                else if (typeof content === "string") {
                    this.frames[i].element.innerHTML = this.frames[i].element.innerHTML.replace(content, "");
                }
                return true;
            }
        }
        return false;
    }
    /**
     * Replaces old content with new content in a layout frame. Returns true for success. Else false.
     */
    replaceContentOf(name: string, oldContent: HTMLElement|string, newContent: HTMLElement|string): boolean {
        for (var i = 0; i < this.frames.length; i++) {
            if (this.frames[i].name === name) {
                if (typeof oldContent === "HTMLElement" && typeof newContent === "HTMLELement")
                    this.frames[i].element.replaceChild(newContent, oldContent);
                else if (typeof newContent === "string" && typeof oldContent === "string") {
                    this.frames[i].element.innerHTML = this.frames[i].element.innerHTML.replace(oldContent, newContent);
                }
                return true;
            }
        }
        return false;
    }

    getFrameByName(name: string): layoutFrame {
        for (var i = 0; i < this.frames.length; i++) {
            if (this.frames[i].name === name) {
                return this.frames[i];
            }
        }
    }

    getBorderByElement(element: HTMLElement|EventTarget): layoutBorder {
        for (var i = 0; i < this.frames.length; i++) {
            if (this.frames[i].borders !== undefined) {
                for (var p = 0; p < this.frames[i].borders.length; p++) {
                    if (this.frames[i].borders[p].element === element) {
                        return this.frames[i].borders[p];
                    }
                }
            }
        }
    }

    positionBorder() {
        if (this.currentMovingBorder.move === true) {
            if (this.mouse.deltaX !== 0 && (this.currentMovingBorder.position === "left" || this.currentMovingBorder.position === "right")) {
                var deltaX = this.mouse.positionX - parseInt(this.currentMovingBorder.element.style.left),
                    borderPosX = parseInt(this.currentMovingBorder.element.style.left);

                this.currentMovingBorder.element.style.left = borderPosX + deltaX - 4 + "px";
            }
            if (this.mouse.deltaY !== 0 && (this.currentMovingBorder.position === "top" || this.currentMovingBorder.position === "down")) {
                this.currentMovingBorder.element.style.backgroundColor = "#eee";
            }
            window.requestAnimationFrame(() => this.positionBorder());
        } else {
            this.currentMovingBorder = undefined;
            document.removeEventListener("mousemove", (event: MouseEvent) => this.setMousePosition(event));
            document.removeEventListener("mouseup", (event: MouseEvent) => this.setMouseEvent(event));
            document.removeEventListener("mousedown", (event: MouseEvent) => this.setMouseEvent(event));
            return;
        }
    }
};
