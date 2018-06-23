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
import { BaseConsoleView } from "./BaseConsoleView";
import { FC } from "../FC";
import { InteractiveEvent } from "fsuite";
var ConsoleView = /** @class */ (function (_super) {
    __extends(ConsoleView, _super);
    function ConsoleView() {
        return _super.call(this) || this;
    }
    ConsoleView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.titleVisible = false;
        this.displayListBtn = this.createTitleBtn("DL", {
            title: FC.config.localization.displayListBtnTooltipTitle,
            text: FC.config.localization.displayListBtnTooltipText
        });
        this.closeBtn = this.createTitleBtn("X", { title: FC.config.localization.closeBtnTooltipTitle });
    };
    ConsoleView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(this.displayListBtn.view, InteractiveEvent.TAP, this.onDisplayListClick);
        this.eventListenerHelper.addEventListener(this.closeBtn.view, InteractiveEvent.TAP, this.onClose);
    };
    ConsoleView.prototype.onDisplayListClick = function () {
        FC.toggleView(FC.displayListView);
    };
    return ConsoleView;
}(BaseConsoleView));
export { ConsoleView };
//# sourceMappingURL=ConsoleView.js.map