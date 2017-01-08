"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseConsoleView_1 = require("./BaseConsoleView");
var FC_1 = require("../FC");
var index_1 = require("fgraphics/dist/index");
var ConsoleView = (function (_super) {
    __extends(ConsoleView, _super);
    function ConsoleView() {
        return _super.call(this) || this;
    }
    ConsoleView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.titleVisible = false;
        this.displayListBtn = this.createTitleBtn("DL", {
            title: FC_1.FC.config.localization.displayListBtnTooltipTitle,
            text: FC_1.FC.config.localization.displayListBtnTooltipText
        });
        this.closeBtn = this.createTitleBtn("X", { title: FC_1.FC.config.localization.closeBtnTooltipTitle });
    };
    ConsoleView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(this.displayListBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onDisplayListClick);
        this.eventListenerHelper.addEventListener(this.closeBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onClose);
    };
    ConsoleView.prototype.onDisplayListClick = function () {
        FC_1.FC.toggleView(FC_1.FC.displayListView);
    };
    return ConsoleView;
}(BaseConsoleView_1.BaseConsoleView));
exports.ConsoleView = ConsoleView;
//# sourceMappingURL=ConsoleView.js.map