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
import { DisplayObjectContainer, Graphics, FLabel } from "fsuite";
import { BaseObject, EventListenerHelper } from "fcore";
import { DragHelper, DragHelperEvent } from "fsuite";
import { BaseConsoleButton } from "./BaseConsoleButton";
import { FC } from "../FC";
import { CaptureKeyButton } from "./capturekey/CaptureKeyButton";
import { CaptuerKeyButtonEvent } from "./capturekey/CaptureKeyButtonEvent";
var BaseConsoleView = /** @class */ (function (_super) {
    __extends(BaseConsoleView, _super);
    function BaseConsoleView() {
        var _this = _super.call(this) || this;
        // private captureKey:string;
        _this.lastBgWidth = 0;
        _this.lastBgHeight = 0;
        return _this;
    }
    BaseConsoleView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        // this.captureKey = "";
        this._titleVisible = true;
        this._captureVisible = false;
        this.buttonsList = [];
        this.buttonsEventListenerHelper = new EventListenerHelper(this);
        this.view = new DisplayObjectContainer();
        this.bgGraphics = new Graphics();
        this.view.addChild(this.bgGraphics);
        //
        this.bgGraphics.interactive = true;
        this.dragHelper = new DragHelper();
        this.dragHelper.view = this.bgGraphics;
        this.contentCont = new DisplayObjectContainer();
        this.view.addChild(this.contentCont);
        this.titleCont = new DisplayObjectContainer();
        this.contentCont.addChild(this.titleCont);
        this.titleLabel = new FLabel();
        this.titleCont.addChild(this.titleLabel);
        this.titleLabel.color = FC.config.viewSettings.titleLabelColor;
        this.titleLabel.size = FC.config.viewSettings.titleLabelSize;
        this.titleLabel.text = "Test Title";
        this.btnsCont = new DisplayObjectContainer();
        this.titleCont.addChild(this.btnsCont);
        this.captureBtn = new CaptureKeyButton();
        this.titleCont.addChild(this.captureBtn.view);
        this.captureBtn.view.y = this.titleLabel.y + this.titleLabel.height;
        //
        this.captureBtn.tooltipData = { title: FC.config.localization.captureKeyBtnTooltipTitle };
        this.insideContentCont = new DisplayObjectContainer();
        this.contentCont.addChild(this.insideContentCont);
    };
    BaseConsoleView.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        if (this.buttonsEventListenerHelper) {
            this.buttonsEventListenerHelper.destruction();
            this.buttonsEventListenerHelper = null;
        }
    };
    BaseConsoleView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(this.dragHelper, DragHelperEvent.DRAG_START, this.onDragStart);
        this.eventListenerHelper.addEventListener(this.dragHelper, DragHelperEvent.DRAG_UPDATE, this.onDragUpdate);
        this.eventListenerHelper.addEventListener(this.captureBtn, CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS, this.onCaptureKey);
    };
    BaseConsoleView.prototype.onDragStart = function () {
        this.viewDragStartX = this.view.x;
        this.viewDragStartY = this.view.y;
        FC.moveViewToTopLayer(this);
    };
    BaseConsoleView.prototype.onDragUpdate = function () {
        this.view.x = this.viewDragStartX + this.dragHelper.changeDragGlobalX;
        this.view.y = this.viewDragStartY + this.dragHelper.changeDragGlobalY;
    };
    BaseConsoleView.prototype.onClose = function () {
        FC.hideView(this);
    };
    BaseConsoleView.prototype.onCaptureKey = function () {
    };
    Object.defineProperty(BaseConsoleView.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (value == this.visible) {
                return;
            }
            this._visible = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    BaseConsoleView.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.titleLabel.visible = this.titleVisible;
        this.captureBtn.view.visible = this.captureVisible;
        this.arrange();
    };
    BaseConsoleView.prototype.arrange = function () {
        // Reset previously set changes
        var tempBtn;
        var prevBtn;
        var btnsCount = this.buttonsList.length;
        for (var btnIndex = 0; btnIndex < btnsCount; btnIndex++) {
            tempBtn = this.buttonsList[btnIndex];
            if (prevBtn) {
                tempBtn.view.x = prevBtn.view.x + prevBtn.view.width + 5;
            }
            prevBtn = tempBtn;
        }
        if (this.titleVisible) {
            this.btnsCont.x = this.titleLabel.x + this.titleLabel.width + 10;
        }
        else {
            this.btnsCont.x = this.titleLabel.x;
        }
        if (this.insideContentCont.visible) {
            this.insideContentCont.y = this.titleCont.y + this.titleCont.height;
        }
        else {
            this.insideContentCont.y = 0;
        }
        var tempWidth = this.contentCont.width + FC.config.viewSettings.bgToContentShift.x;
        var tempHeight = this.contentCont.height + FC.config.viewSettings.bgToContentShift.y;
        if (tempWidth != this.lastBgWidth || tempHeight != this.lastBgHeight) {
            this.lastBgWidth = tempWidth;
            this.lastBgHeight = tempHeight;
            this.bgGraphics.clear();
            this.bgGraphics.beginFill(FC.config.viewSettings.bgColor, FC.config.viewSettings.bgAlpha);
            this.bgGraphics.lineStyle(FC.config.viewSettings.borderWidth, FC.config.viewSettings.borderColor, FC.config.viewSettings.borderAlpha);
            this.bgGraphics.drawRect(0, 0, tempWidth, tempHeight);
            this.bgGraphics.endFill();
        }
        this.contentCont.x = this.bgGraphics.x + ((this.bgGraphics.width - this.contentCont.width) >> 1);
        this.contentCont.y = this.bgGraphics.y + ((this.bgGraphics.height - this.contentCont.height) >> 1);
    };
    BaseConsoleView.prototype.createTitleBtn = function (label, tooltipData) {
        var tempBtn = new BaseConsoleButton();
        this.btnsCont.addChild(tempBtn.view);
        tempBtn.label = label;
        tempBtn.tooltipData = tooltipData;
        this.buttonsList.push(tempBtn);
        return tempBtn;
    };
    Object.defineProperty(BaseConsoleView.prototype, "titleVisible", {
        get: function () {
            return this._titleVisible;
        },
        set: function (value) {
            if (value == this.titleVisible) {
                return;
            }
            this._titleVisible = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseConsoleView.prototype, "captureVisible", {
        get: function () {
            return this._captureVisible;
        },
        set: function (value) {
            if (value == this.captureVisible) {
                return;
            }
            this._captureVisible = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    BaseConsoleView.CAPTURE_LABEL_FIRST_PART = "Capture key:";
    BaseConsoleView.NO_CAPTURE_KEY_TEXT = "(click to add)";
    return BaseConsoleView;
}(BaseObject));
export { BaseConsoleView };
//# sourceMappingURL=BaseConsoleView.js.map