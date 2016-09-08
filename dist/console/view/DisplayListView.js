"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseConsoleView_1 = require("./BaseConsoleView");
var index_1 = require("fgraphics/dist/index");
var index_2 = require("fcore/dist/index");
var index_3 = require("flibs/dist/index");
var BaseConsoleButton_1 = require("./BaseConsoleButton");
var FC_1 = require("../FC");
var DisplayListView = (function (_super) {
    __extends(DisplayListView, _super);
    function DisplayListView() {
        _super.call(this);
    }
    DisplayListView.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.captureVisible = true;
        this.lastCheckedPos = new index_2.Point();
        this.moveObjectIndex = -1;
        this.moveObjectWrapper = index_1.EngineAdapter.instance.createDisplayObjectWrapper();
        this.titleLabel.text = FC_1.FC.config.localization.displayListTitle;
        this.insideContentCont.visible = true;
        this.additionalInfoBtn = new BaseConsoleButton_1.BaseConsoleButton();
        this.insideContentCont.addChild(this.additionalInfoBtn.view);
        this.additionalInfoBtn.tooltipData = {
            title: FC_1.FC.config.localization.additionalInfoBtnTooltipTitle,
            text: FC_1.FC.config.localization.additionalInfoBtnTooltipText
        };
        //
        this.additionalInfoBtn.view.y = 5;
        this.moveHelperBtn = new BaseConsoleButton_1.BaseConsoleButton();
        this.insideContentCont.addChild(this.moveHelperBtn.view);
        this.moveHelperBtn.tooltipData = {
            title: FC_1.FC.config.localization.moveHelperTooltipTitle,
            text: FC_1.FC.config.localization.moveHelperTooltipText
        };
        //
        this.moveHelperBtn.view.y = this.additionalInfoBtn.view.y + this.additionalInfoBtn.view.height;
        this.displayListField = index_1.EngineAdapter.instance.createTextWrapper();
        this.insideContentCont.addChild(this.displayListField);
        this.displayListField.color = FC_1.FC.config.displayListSettings.hierarchyLabelColor;
        this.displayListField.size = FC_1.FC.config.displayListSettings.hierarchyLabelSize;
        //
        this.displayListField.y = this.moveHelperBtn.view.y + this.moveHelperBtn.view.height + 5;
        this.closeBtn = this.createTitleBtn("X", { title: FC_1.FC.config.localization.closeBtnTooltipTitle });
        this.captureBtn.tooltipData.text = FC_1.FC.config.localization.displayListCapturedKeyText;
    };
    DisplayListView.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        this.lastUnderPointData = null;
        this.lastAllObjectsUnderPointList = null;
        if (this.moveObjectWrapper) {
            this.moveObjectWrapper.destruction();
            this.moveObjectWrapper = null;
        }
        this.prevMoveObject = null;
    };
    DisplayListView.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
        this.eventListenerHelper.addEventListener(index_1.EngineAdapter.instance.mainTicker, index_1.TickerEvent.TICK, this.onTick);
        this.eventListenerHelper.addEventListener(this.closeBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onClose);
        this.eventListenerHelper.addEventListener(this.additionalInfoBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onAdditionalInfo);
        this.eventListenerHelper.addEventListener(this.moveHelperBtn.view, index_1.DisplayObjectWrapperMouseEvent.CLICK, this.onMoveHelper);
        this.eventListenerHelper.addEventListener(index_3.InputManager.instance, index_3.InputManagerEvent.KEY_DOWN, this.onKeyDown);
    };
    DisplayListView.prototype.onTick = function () {
        if (this.visible) {
            /*if (this.lastCheckedPos.x != EngineAdapter.instance.globalMouseX ||
             this.lastCheckedPos.y != EngineAdapter.instance.globalMouseY) {*/
            this.lastCheckedPos.x = index_1.EngineAdapter.instance.globalMouseX;
            this.lastCheckedPos.y = index_1.EngineAdapter.instance.globalMouseY;
            var underPointData = index_1.EngineAdapter.instance.getNativeObjectsUnderPoint(index_1.EngineAdapter.instance.stage.object, index_1.EngineAdapter.instance.globalMouseX, index_1.EngineAdapter.instance.globalMouseY);
            if (this.forceUpdateUnderPointView || !this.checkUnderPointDataEqual(underPointData, this.lastUnderPointData)) {
                this.forceUpdateUnderPointView = false;
                this.lastUnderPointData = underPointData;
                this.lastAllObjectsUnderPointList = [];
                this.parseUnderPointDataToSingleList(this.lastUnderPointData, this.lastAllObjectsUnderPointList);
                var listText = this.parseUnderPointData(underPointData);
                this.displayListField.text = listText;
                this.arrange();
            }
        }
    };
    DisplayListView.prototype.onCaptureKey = function () {
        _super.prototype.onCaptureKey.call(this);
        var underPointData = index_1.EngineAdapter.instance.getNativeObjectsUnderPoint(index_1.EngineAdapter.instance.stage.object, index_1.EngineAdapter.instance.globalMouseX, index_1.EngineAdapter.instance.globalMouseY);
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
            var tempCode = index_2.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            if (tempCode == index_2.KeyCodes.CONTROL) {
                this.moveObjectIndex--;
                this.commitData();
            }
            else if (DisplayListView.ARROW_KEY_CODES.indexOf(tempCode) != -1) {
                if (this.moveObjectWrapper.object) {
                    var tempChangeX = 0;
                    var tempChangeY = 0;
                    if (tempCode == index_2.KeyCodes.LEFT_ARROW) {
                        tempChangeX = -1;
                    }
                    else if (tempCode == index_2.KeyCodes.RIGHT_ARROW) {
                        tempChangeX = 1;
                    }
                    if (tempCode == index_2.KeyCodes.UP_ARROW) {
                        tempChangeY = -1;
                    }
                    else if (tempCode == index_2.KeyCodes.DOWN_ARROW) {
                        tempChangeY = 1;
                    }
                    if (index_3.InputManager.instance.checkIfKeyDown(index_2.KeyCodes.SHIFT)) {
                        tempChangeX *= 10;
                        tempChangeY *= 10;
                    }
                    this.moveObjectWrapper.x += tempChangeX;
                    this.moveObjectWrapper.y += tempChangeY;
                    console.log("Movable object: ", this.moveObjectWrapper.object);
                    console.log("x: " + this.moveObjectWrapper.x + ", y: " + this.moveObjectWrapper.y);
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
            if (this.isMoveHelperEnabled) {
                if (data.object == this.moveObjectWrapper.object) {
                    result += " " + FC_1.FC.config.localization.movableObjectText;
                }
            }
            if (this.isAdditionalInfoEnabled) {
                if (FC_1.FC.config.displayListSettings.additionalInfoParams) {
                    result += "    { ";
                    var parsedData = void 0;
                    var tempParamConfig = void 0;
                    var keys = Object.keys(FC_1.FC.config.displayListSettings.additionalInfoParams);
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
                            tempParamConfig = FC_1.FC.config.displayListSettings.additionalInfoParams[tempKey];
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
            }
        }
    };
    DisplayListView.prototype.checkUnderPointDataEqual = function (data1, data2) {
        var result = true;
        // If one of the data objects exists and other doesn't
        if (!!data1 != !!data2) {
            result = false;
        }
        else if (data1 && data2) {
            if (data1.object != data2.object) {
                result = false;
            }
            else if (!!data1.children != !!data2.children) {
                result = false;
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
                this.additionalInfoBtn.label = FC_1.FC.config.localization.additionalInfoBtnPressedLabel;
            }
            else {
                this.additionalInfoBtn.label = FC_1.FC.config.localization.additionalInfoBtnNormalLabel;
            }
        }
        if (this.moveHelperBtn) {
            if (this.isMoveHelperEnabled) {
                this.moveHelperBtn.label = FC_1.FC.config.localization.moveHelperBtnPressedLabel;
                // Select an object (if index is -1, it means that selection is reset)
                if (this.moveObjectIndex < -1 || this.moveObjectIndex >= this.lastAllObjectsUnderPointList.length) {
                    this.moveObjectIndex = this.lastAllObjectsUnderPointList.length - 1;
                }
                // If there is an object, select it
                if (this.lastAllObjectsUnderPointList[this.moveObjectIndex]) {
                    this.moveObjectWrapper.object = this.lastAllObjectsUnderPointList[this.moveObjectIndex];
                }
                else {
                    this.moveObjectWrapper.object = null;
                }
            }
            else {
                this.moveHelperBtn.label = FC_1.FC.config.localization.moveHelperBtnNormalLabel;
                // Reset selection
                this.moveObjectWrapper.object = null;
                this.moveObjectIndex = -1;
            }
            // Update the under point view if a new move object was chosen
            if (this.prevMoveObject !== this.moveObjectWrapper.object) {
                this.forceUpdateUnderPointView = true;
            }
            this.prevMoveObject = this.moveObjectWrapper.object;
        }
    };
    DisplayListView.ARROW_KEY_CODES = [index_2.KeyCodes.LEFT_ARROW, index_2.KeyCodes.RIGHT_ARROW, index_2.KeyCodes.UP_ARROW, index_2.KeyCodes.DOWN_ARROW];
    return DisplayListView;
}(BaseConsoleView_1.BaseConsoleView));
exports.DisplayListView = DisplayListView;
//# sourceMappingURL=DisplayListView.js.map