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
import { BaseTooltip } from "../../../tooltip/BaseTooltip";
import { DisplayObjectContainer, Graphics, FLabel, Align } from "fsuite";
import { FC } from "../../FC";
var ConsoleTooltip = /** @class */ (function (_super) {
    __extends(ConsoleTooltip, _super);
    function ConsoleTooltip() {
        return _super.call(this) || this;
    }
    ConsoleTooltip.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.bg = new Graphics();
        this.view.addChild(this.bg);
        this.contentCont = new DisplayObjectContainer();
        this.view.addChild(this.contentCont);
        this.titleLabel = new FLabel();
        this.contentCont.addChild(this.titleLabel);
        this.titleLabel.align = Align.CENTER;
        this.titleLabel.color = FC.config.tooltipSettings.titleLabelColor;
        this.titleLabel.size = FC.config.tooltipSettings.titleLabelSize;
        this.textLabel = new FLabel();
        this.contentCont.addChild(this.textLabel);
        this.textLabel.align = Align.CENTER;
        this.textLabel.color = FC.config.tooltipSettings.textLabelColor;
        this.textLabel.size = FC.config.tooltipSettings.textLabelSize;
    };
    ConsoleTooltip.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        if (!this.tooltipData) {
            return;
        }
        this.titleLabel.text = this.tooltipData.title;
        this.textLabel.text = this.tooltipData.text;
        if (this.tooltipData.text) {
            this.textLabel.visible = true;
        }
        else {
            this.textLabel.visible = false;
        }
        this.arrange();
    };
    ConsoleTooltip.prototype.arrange = function () {
        _super.prototype.arrange.call(this);
        if (this.textLabel.visible) {
            var labelMaxWidth = Math.max(this.titleLabel.width, this.textLabel.width);
            this.titleLabel.x = ((labelMaxWidth - this.titleLabel.width) >> 1);
            this.textLabel.x = ((labelMaxWidth - this.textLabel.width) >> 1);
            this.textLabel.y = this.titleLabel.y + this.titleLabel.height;
        }
        else {
            this.titleLabel.x = 0;
        }
        this.bg.clear();
        this.bg.beginFill(FC.config.tooltipSettings.bgColor, FC.config.tooltipSettings.bgAlpha);
        this.bg.lineStyle(FC.config.tooltipSettings.borderWidth, FC.config.tooltipSettings.borderColor, FC.config.tooltipSettings.borderAlpha);
        this.bg.drawRect(0, 0, this.contentCont.width + FC.config.tooltipSettings.bgToContentShift.x, this.contentCont.height + FC.config.tooltipSettings.bgToContentShift.y);
        this.bg.endFill();
        this.contentCont.x = this.bg.x + ((this.bg.width - this.contentCont.width) >> 1);
        this.contentCont.y = this.bg.y + ((this.bg.height - this.contentCont.height) >> 1);
    };
    return ConsoleTooltip;
}(BaseTooltip));
export { ConsoleTooltip };
//# sourceMappingURL=ConsoleTooltip.js.map