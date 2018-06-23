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
import { BaseConsoleButton } from "../BaseConsoleButton";
import { InputManager, InputManagerEvent } from "fsuite";
import { KeyboardTools, StringTools } from "fcore";
import { CaptuerKeyButtonEvent } from "./CaptureKeyButtonEvent";
import { FC } from "../../FC";
var CaptureKeyButton = /** @class */ (function (_super) {
    __extends(CaptureKeyButton, _super);
    function CaptureKeyButton() {
        return _super.call(this) || this;
    }
    CaptureKeyButton.prototype.construction = function () {
        _super.prototype.construction.call(this);
    };
    CaptureKeyButton.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(InputManager.instance, InputManagerEvent.KEY_PRESS, this.onKeyPress);
    };
    CaptureKeyButton.prototype.onClick = function () {
        _super.prototype.onClick.call(this);
        this.isClicked = !this.isClicked;
    };
    CaptureKeyButton.prototype.onKeyPress = function (data) {
        if (this.isClicked) {
            this.isClicked = false;
            this.captureCode = KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            this.captureKey = KeyboardTools.getCharFromKeyPressEvent(data.nativeEvent);
            this.commitData();
        }
        else if (this.captureCode) {
            if (KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent) == this.captureCode) {
                this.dispatchEvent(CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS);
            }
        }
    };
    CaptureKeyButton.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        if (this.isClicked) {
            this.label = FC.config.localization.captureKeyBtnPressedLabel;
        }
        else if (this.captureKey) {
            this.label = StringTools.substituteList(FC.config.localization.captureKeyBtnNormalLabel, this.captureKey);
        }
        else {
            this.label = StringTools.substituteList(FC.config.localization.captureKeyBtnNormalLabel, FC.config.localization.captureKeyBtnNoKeyHelpText);
        }
    };
    CaptureKeyButton.prototype.arrange = function () {
        _super.prototype.arrange.call(this);
    };
    Object.defineProperty(CaptureKeyButton.prototype, "isClicked", {
        get: function () {
            return this._isClicked;
        },
        set: function (value) {
            if (value == this.isClicked) {
                return;
            }
            this._isClicked = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return CaptureKeyButton;
}(BaseConsoleButton));
export { CaptureKeyButton };
//# sourceMappingURL=CaptureKeyButton.js.map