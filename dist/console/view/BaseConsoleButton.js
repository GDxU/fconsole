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
import { DisplayObjectContainer, FLabel, InteractiveEvent } from "fsuite";
import { BaseObject } from "fcore";
import { FC } from "../FC";
var BaseConsoleButton = /** @class */ (function (_super) {
    __extends(BaseConsoleButton, _super);
    function BaseConsoleButton() {
        var _this = _super.call(this) || this;
        _this._label = "";
        return _this;
    }
    BaseConsoleButton.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.view = new DisplayObjectContainer();
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.field = new FLabel();
        this.view.addChild(this.field);
        this.field.color = FC.config.btnSettings.labelColor;
        this.field.size = FC.config.btnSettings.labelSize;
        this.commitData();
        this.onOut();
    };
    BaseConsoleButton.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(this.view, InteractiveEvent.OVER, this.onOver);
        this.eventListenerHelper.addEventListener(this.view, InteractiveEvent.OUT, this.onOut);
        this.eventListenerHelper.addEventListener(this.view, InteractiveEvent.TAP, this.onClick);
        this.eventListenerHelper.addEventListener(this.view, InteractiveEvent.UP_OUTSIDE, this.onOut);
    };
    BaseConsoleButton.prototype.onOver = function () {
        this.view.alpha = 1;
        if (this.tooltipData) {
            FC.tooltipManager.show(this.tooltipData);
        }
    };
    BaseConsoleButton.prototype.onOut = function () {
        this.view.alpha = 0.75;
        FC.tooltipManager.hide();
    };
    BaseConsoleButton.prototype.onClick = function () {
        this.onOut();
    };
    BaseConsoleButton.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.field.text = this.label;
        this.arrange();
    };
    BaseConsoleButton.prototype.arrange = function () {
        _super.prototype.arrange.call(this);
    };
    Object.defineProperty(BaseConsoleButton.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            if (value == this.label) {
                return;
            }
            this._label = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return BaseConsoleButton;
}(BaseObject));
export { BaseConsoleButton };
//# sourceMappingURL=BaseConsoleButton.js.map