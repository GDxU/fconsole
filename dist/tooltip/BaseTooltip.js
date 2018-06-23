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
import { DisplayObjectContainer } from "fsuite";
import { BaseObject } from "fcore";
var BaseTooltip = /** @class */ (function (_super) {
    __extends(BaseTooltip, _super);
    function BaseTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseTooltip.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.view = new DisplayObjectContainer();
    };
    BaseTooltip.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.tooltipData = this.data;
    };
    return BaseTooltip;
}(BaseObject));
export { BaseTooltip };
//# sourceMappingURL=BaseTooltip.js.map