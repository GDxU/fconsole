var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseObject } from "fcore";
import { DisplayObjectContainer, Point, FApp } from "fsuite";
var TooltipManager = /** @class */ (function (_super) {
    __extends(TooltipManager, _super);
    function TooltipManager(tooltip) {
        return _super.call(this, tooltip) || this;
    }
    TooltipManager.prototype.construction = function (tooltip) {
        _super.prototype.construction.call(this);
        this.tooltip = tooltip;
        this.mouseShift = new Point();
        this.tooltipInsideCont = new DisplayObjectContainer();
        this.tooltipInsideCont.addChild(this.tooltip.view);
        this.hide();
    };
    TooltipManager.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        FApp.instance.ticker.add(this.onTick, this);
    };
    TooltipManager.prototype.removeListeners = function () {
        _super.prototype.removeListeners.call(this);
        FApp.instance.ticker.remove(this.onTick, this);
    };
    TooltipManager.prototype.onTick = function () {
        this.update();
    };
    TooltipManager.prototype.show = function (data) {
        this.visible = true;
        this.tooltip.data = data;
        this.update();
    };
    TooltipManager.prototype.hide = function () {
        this.visible = false;
    };
    /**
     * Обновление подсказки.
     */
    TooltipManager.prototype.update = function () {
        if (!this.visible) {
            return;
        }
        if (!this.tooltipCont) {
            return;
        }
        if (!this.tooltip) {
        }
        var globalPos = FApp.instance.getGlobalInteractionPosition();
        var tempPos = globalPos.clone();
        tempPos.x += this.mouseShift.x;
        tempPos.y += this.mouseShift.y;
        if (tempPos.x < 0) {
            tempPos.x = 0;
        }
        else if (tempPos.x + this.tooltip.view.width > FApp.instance.renderer.width) {
            tempPos.x = FApp.instance.renderer.width - this.tooltip.view.width;
        }
        if (tempPos.y < 0) {
            tempPos.y = 0;
        }
        else if (tempPos.y + this.tooltip.view.height > FApp.instance.renderer.height) {
            tempPos.y = FApp.instance.renderer.height - this.tooltip.view.height;
        }
        tempPos = this.tooltip.view.parent.toLocal(tempPos);
        this.moveTooltipTo(tempPos.x, tempPos.y);
    };
    /**
     * Move a tooltip to a new position.
     * Might be overridden in subclasses to implement different behavior (e.g. tween movement).
     *
     * @param x
     * @param y
     */
    TooltipManager.prototype.moveTooltipTo = function (x, y) {
        this.tooltip.view.x = x;
        this.tooltip.view.y = y;
    };
    Object.defineProperty(TooltipManager.prototype, "tooltipCont", {
        get: function () {
            return this._tooltipCont;
        },
        set: function (value) {
            if (this.tooltipCont == value) {
                return;
            }
            this._tooltipCont = value;
            if (this.tooltipCont) {
                this.tooltipCont.addChild(this.tooltipInsideCont);
            }
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipManager.prototype, "mouseShift", {
        get: function () {
            return this._mouseShift;
        },
        set: function (value) {
            this._mouseShift = value.clone();
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipManager.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.tooltipInsideCont.visible = this.visible;
        },
        enumerable: true,
        configurable: true
    });
    TooltipManager.SHOW_DELAY = 0.5;
    return TooltipManager;
}(BaseObject));
export { TooltipManager };
//# sourceMappingURL=TooltipManager.js.map