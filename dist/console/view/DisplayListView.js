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
import { KeyboardTools } from "fcore";
import { FLabel, Point, InteractiveEvent, KeyCodes, FDisplayTools, FApp } from "fsuite";
import { InputManager, InputManagerEvent } from "fsuite";
import { BaseConsoleView } from "./BaseConsoleView";
import { BaseConsoleButton } from "./BaseConsoleButton";
import { FC } from "../FC";
var DisplayListView = /** @class */ (function (_super) {
    __extends(DisplayListView, _super);
    function DisplayListView() {
        return _super.call(this) || this;
    }
    DisplayListView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.captureVisible = true;
        this.lastCheckedPos = new Point();
        this.moveObjectIndex = -1;
        this.titleLabel.text = FC.config.localization.displayListTitle;
        this.insideContentCont.visible = true;
        this.additionalInfoBtn = new BaseConsoleButton();
        this.insideContentCont.addChild(this.additionalInfoBtn.view);
        this.additionalInfoBtn.tooltipData = {
            title: FC.config.localization.additionalInfoBtnTooltipTitle,
            text: FC.config.localization.additionalInfoBtnTooltipText
        };
        this.additionalInfoBtn.field.size = FC.config.btnSettings.smallSize;
        //
        this.additionalInfoBtn.view.y = 5;
        this.moveHelperBtn = new BaseConsoleButton();
        this.insideContentCont.addChild(this.moveHelperBtn.view);
        this.moveHelperBtn.tooltipData = {
            title: FC.config.localization.moveHelperTooltipTitle,
            text: FC.config.localization.moveHelperTooltipText
        };
        this.moveHelperBtn.field.size = FC.config.btnSettings.smallSize;
        //
        this.moveHelperBtn.view.y = this.additionalInfoBtn.view.y + this.additionalInfoBtn.view.height;
        this.displayListField = new FLabel();
        this.insideContentCont.addChild(this.displayListField);
        this.displayListField.color = FC.config.displayListSettings.hierarchyLabelColor;
        this.displayListField.size = FC.config.displayListSettings.hierarchyLabelSize;
        //
        this.displayListField.y = this.moveHelperBtn.view.y + this.moveHelperBtn.view.height + 5;
        this.closeBtn = this.createTitleBtn("X", { title: FC.config.localization.closeBtnTooltipTitle });
        this.captureBtn.tooltipData.text = FC.config.localization.displayListCapturedKeyText;
    };
    DisplayListView.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        this.lastUnderPointData = null;
        this.lastAllObjectsUnderPointList = null;
        if (this.moveObject) {
            this.moveObject = null;
        }
        this.prevMoveObject = null;
    };
    DisplayListView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        /*this.eventListenerHelper.addEventListener(
            EngineAdapter.instance.mainTicker,
            TickerEvent.TICK,
            this.onTick
        );*/
        FApp.instance.ticker.add(this.onTick, this);
        this.eventListenerHelper.addEventListener(this.closeBtn.view, InteractiveEvent.TAP, this.onClose);
        this.eventListenerHelper.addEventListener(this.additionalInfoBtn.view, InteractiveEvent.TAP, this.onAdditionalInfo);
        this.eventListenerHelper.addEventListener(this.moveHelperBtn.view, InteractiveEvent.TAP, this.onMoveHelper);
        this.eventListenerHelper.addEventListener(InputManager.instance, InputManagerEvent.KEY_DOWN, this.onKeyDown);
    };
    DisplayListView.prototype.removeListeners = function () {
        _super.prototype.removeListeners.call(this);
        FApp.instance.ticker.remove(this.onTick, this);
    };
    DisplayListView.prototype.onTick = function () {
        if (this.visible) {
            /*if (this.lastCheckedPos.x != EngineAdapter.instance.globalMouseX ||
             this.lastCheckedPos.y != EngineAdapter.instance.globalMouseY) {*/
            var globalPos = FApp.instance.getGlobalInteractionPosition();
            this.lastCheckedPos.x = globalPos.x;
            this.lastCheckedPos.y = globalPos.y;
            var underPointData = FDisplayTools.getObjectsUnderPoint(FApp.instance.stage, globalPos.x, globalPos.y);
            if (this.forceUpdateUnderPointView || !this.checkUnderPointDataEqual(underPointData, this.lastUnderPointData)) {
                this.forceUpdateUnderPointView = false;
                this.lastUnderPointData = underPointData;
                this.lastAllObjectsUnderPointList = [];
                this.parseUnderPointDataToSingleList(this.lastUnderPointData, this.lastAllObjectsUnderPointList);
                var listText = this.parseUnderPointData(underPointData);
                this.displayListField.text = listText;
                this.arrange();
            }
            // }
        }
    };
    DisplayListView.prototype.onCaptureKey = function () {
        _super.prototype.onCaptureKey.call(this);
        var globalPos = FApp.instance.getGlobalInteractionPosition();
        var underPointData = FDisplayTools.getObjectsUnderPoint(FApp.instance.stage, globalPos.x, globalPos.y);
        // Log the parsed structure
        console.group("Display list structure:");
        this.groupLogUnderPointData(underPointData);
        console.groupEnd();
    };
    DisplayListView.prototype.onAdditionalInfo = function () {
        this.isAdditionalInfoEnabled = !this.isAdditionalInfoEnabled;
    };
    DisplayListView.prototype.onMoveHelper = function () {
        this.isMoveHelperEnabled = !this.isMoveHelperEnabled;
    };
    DisplayListView.prototype.onKeyDown = function (data) {
        if (this.isMoveHelperEnabled) {
            var tempCode = KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            if (tempCode == KeyCodes.CONTROL) {
                this.moveObjectIndex--;
                this.commitData();
            }
            else if (DisplayListView.ARROW_KEY_CODES.indexOf(tempCode) != -1) {
                if (this.moveObject) {
                    var tempChangeX = 0;
                    var tempChangeY = 0;
                    if (tempCode == KeyCodes.LEFT_ARROW) {
                        tempChangeX = -1;
                    }
                    else if (tempCode == KeyCodes.RIGHT_ARROW) {
                        tempChangeX = 1;
                    }
                    if (tempCode == KeyCodes.UP_ARROW) {
                        tempChangeY = -1;
                    }
                    else if (tempCode == KeyCodes.DOWN_ARROW) {
                        tempChangeY = 1;
                    }
                    if (InputManager.instance.checkIfKeyDown(KeyCodes.SHIFT)) {
                        tempChangeX *= 10;
                        tempChangeY *= 10;
                    }
                    this.moveObject.x += tempChangeX;
                    this.moveObject.y += tempChangeY;
                    console.log("Movable object: ", this.moveObject);
                    console.log("x: " + this.moveObject.x + ", y: " + this.moveObject.y);
                }
            }
        }
    };
    DisplayListView.prototype.parseUnderPointData = function (data, prefix) {
        if (prefix === void 0) { prefix = "∟"; }
        var result = "";
        if (data && data.object) {
            var tempName = data.object.toString();
            if (data.object.constructor) {
                tempName = data.object.constructor.name;
            }
            result += prefix + " " + tempName;
            if (FC.config.displayListSettings.nameParamName) {
                if (data.object[FC.config.displayListSettings.nameParamName]) {
                    result += " (" + data.object[FC.config.displayListSettings.nameParamName] + ")";
                }
            }
            if (this.isMoveHelperEnabled) {
                if (data.object == this.moveObject) {
                    result += " " + FC.config.localization.movableObjectText;
                }
            }
            if (this.isAdditionalInfoEnabled) {
                if (FC.config.displayListSettings.additionalInfoParams) {
                    result += " - { ";
                    var parsedData = void 0;
                    var tempParamConfig = void 0;
                    var keys = Object.keys(FC.config.displayListSettings.additionalInfoParams);
                    var tempKey = void 0;
                    var tempVisualKey = void 0;
                    var keysCount = keys.length;
                    for (var keyIndex = 0; keyIndex < keysCount; keyIndex++) {
                        tempKey = keys[keyIndex];
                        if (data.object[tempKey] !== undefined) {
                            if (keyIndex > 0) {
                                result += ", ";
                            }
                            parsedData = data.object[tempKey];
                            //
                            tempParamConfig = FC.config.displayListSettings.additionalInfoParams[tempKey];
                            if (tempParamConfig.toFixed || tempParamConfig.toFixed === 0) {
                                if (parsedData !== Math.floor(parsedData)) {
                                    parsedData = parsedData.toFixed(tempParamConfig.toFixed);
                                }
                            }
                            //
                            tempVisualKey = tempKey;
                            if (tempParamConfig.visualName) {
                                tempVisualKey = tempParamConfig.visualName;
                            }
                            result += tempVisualKey + ": " + parsedData;
                        }
                    }
                    result += " }";
                }
            }
            if (data.children && data.children.length > 0) {
                var childPrefix = "- " + prefix;
                var childrenCount = data.children.length;
                for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                    result += "\n" + this.parseUnderPointData(data.children[childIndex], childPrefix);
                }
            }
        }
        return result;
    };
    DisplayListView.prototype.groupLogUnderPointData = function (data, prefix) {
        if (prefix === void 0) { prefix = "∟"; }
        if (data && data.object) {
            //console.log(data.object);
            //console.dir(data.object);
            console.log(prefix, data.object);
            if (data.children && data.children.length > 0) {
                // console.group(" children");
                var childrenCount = data.children.length;
                for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                    this.groupLogUnderPointData(data.children[childIndex], "    " + prefix);
                }
                // console.groupEnd();
            }
        }
    };
    DisplayListView.prototype.checkUnderPointDataEqual = function (data1, data2) {
        var result = true;
        // If one of the data objects exists and other doesn't
        if (!!data1 != !!data2) {
            result = false;
            // If 2 data objects are available
        }
        else if (data1 && data2) {
            if (data1.object != data2.object) {
                result = false;
                // If one of data has children and other doesn't have
            }
            else if (!!data1.children != !!data2.children) {
                result = false;
                // If there are children arrays in the both data objects
            }
            else if (data1.children && data2.children) {
                // If length of the children lists are not equal, then data objects are not equal too
                if (data1.children.length != data2.children.length) {
                    result = false;
                }
                else {
                    var childrenCount = data1.children.length;
                    for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                        // If one of the children are not equeal, than stop checking and break the loop
                        if (!this.checkUnderPointDataEqual(data1.children[childIndex], data2.children[childIndex])) {
                            result = false;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    };
    DisplayListView.prototype.parseUnderPointDataToSingleList = function (data, list) {
        if (data && data.object) {
            list.push(data.object);
            if (data.children && data.children.length > 0) {
                var childrenCount = data.children.length;
                for (var childIndex = 0; childIndex < childrenCount; childIndex++) {
                    this.parseUnderPointDataToSingleList(data.children[childIndex], list);
                }
            }
        }
    };
    Object.defineProperty(DisplayListView.prototype, "isAdditionalInfoEnabled", {
        get: function () {
            return this._isAdditionalInfoEnabled;
        },
        set: function (value) {
            if (value == this._isAdditionalInfoEnabled) {
                return;
            }
            this._isAdditionalInfoEnabled = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayListView.prototype, "isMoveHelperEnabled", {
        get: function () {
            return this._isMoveHelperEnabled;
        },
        set: function (value) {
            if (value == this._isMoveHelperEnabled) {
                return;
            }
            this._isMoveHelperEnabled = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    DisplayListView.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        if (!this.visible) {
            this.isAdditionalInfoEnabled = false;
            this.isMoveHelperEnabled = false;
        }
        if (this.additionalInfoBtn) {
            if (this.isAdditionalInfoEnabled) {
                this.additionalInfoBtn.label = FC.config.localization.additionalInfoBtnPressedLabel;
            }
            else {
                this.additionalInfoBtn.label = FC.config.localization.additionalInfoBtnNormalLabel;
            }
        }
        if (this.moveHelperBtn) {
            if (this.isMoveHelperEnabled) {
                this.moveHelperBtn.label = FC.config.localization.moveHelperBtnPressedLabel;
                // Select an object (if index is -1, it means that selection is reset)
                if (this.moveObjectIndex < -1 || this.moveObjectIndex >= this.lastAllObjectsUnderPointList.length) {
                    this.moveObjectIndex = this.lastAllObjectsUnderPointList.length - 1;
                }
                // If there is an object, select it
                if (this.lastAllObjectsUnderPointList[this.moveObjectIndex]) {
                    this.moveObject = this.lastAllObjectsUnderPointList[this.moveObjectIndex];
                }
                else {
                    this.moveObject = null;
                }
            }
            else {
                this.moveHelperBtn.label = FC.config.localization.moveHelperBtnNormalLabel;
                // Reset selection
                this.moveObject = null;
                this.moveObjectIndex = -1;
            }
            // Update the under point view if a new move object was chosen
            if (this.prevMoveObject !== this.moveObject) {
                this.forceUpdateUnderPointView = true;
            }
            this.prevMoveObject = this.moveObject;
        }
    };
    DisplayListView.ARROW_KEY_CODES = [KeyCodes.LEFT_ARROW, KeyCodes.RIGHT_ARROW, KeyCodes.UP_ARROW, KeyCodes.DOWN_ARROW];
    return DisplayListView;
}(BaseConsoleView));
export { DisplayListView };
//# sourceMappingURL=DisplayListView.js.map