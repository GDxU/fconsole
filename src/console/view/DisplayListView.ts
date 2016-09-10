import {BaseConsoleView} from "./BaseConsoleView";
import {
    EngineAdapter,
    TickerEvent,
    IObjectUnderPointVO,
    ITextWrapper,
    DisplayObjectWrapperMouseEvent,
    IDisplayObjectWrapper
} from "fgraphics/dist/index";
import {Point, KeyboardTools, KeyCodes} from "fcore/dist/index";
import {InputManager, InputManagerEvent, InputManagerEventData} from "flibs/dist/index";
import {BaseConsoleButton} from "./BaseConsoleButton";
import {FC} from "../FC";

export class DisplayListView extends BaseConsoleView {

    private static ARROW_KEY_CODES:number[] = [KeyCodes.LEFT_ARROW, KeyCodes.RIGHT_ARROW, KeyCodes.UP_ARROW, KeyCodes.DOWN_ARROW];

    private lastCheckedPos:Point;
    private displayListField:ITextWrapper;
    private closeBtn:BaseConsoleButton;
    private lastUnderPointData:IObjectUnderPointVO;
    private lastAllObjectsUnderPointList:any[];

    private forceUpdateUnderPointView:boolean;

    protected additionalInfoBtn:BaseConsoleButton;
    private _isAdditionalInfoEnabled:boolean;

    protected moveHelperBtn:BaseConsoleButton;
    private _isMoveHelperEnabled:boolean;
    private moveObjectWrapper:IDisplayObjectWrapper;
    private prevMoveObject:any;

    private moveObjectIndex:number;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

        this.captureVisible = true;

        this.lastCheckedPos = new Point();
        this.moveObjectIndex = -1;
        this.moveObjectWrapper = EngineAdapter.instance.createDisplayObjectWrapper();


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

        this.displayListField = EngineAdapter.instance.createTextWrapper();
        this.insideContentCont.addChild(this.displayListField);
        this.displayListField.color = FC.config.displayListSettings.hierarchyLabelColor;
        this.displayListField.size = FC.config.displayListSettings.hierarchyLabelSize;
        //
        this.displayListField.y = this.moveHelperBtn.view.y + this.moveHelperBtn.view.height + 5;

        this.closeBtn = this.createTitleBtn(
            "X",
            {title: FC.config.localization.closeBtnTooltipTitle}
        );

        this.captureBtn.tooltipData.text = FC.config.localization.displayListCapturedKeyText;
    }

    public destruction():void {
        super.destruction();

        this.lastUnderPointData = null;
        this.lastAllObjectsUnderPointList = null;

        if (this.moveObjectWrapper) {
            this.moveObjectWrapper.destruction();
            this.moveObjectWrapper = null;
        }
        this.prevMoveObject = null;
    }

    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            EngineAdapter.instance.mainTicker,
            TickerEvent.TICK,
            this.onTick
        );

        this.eventListenerHelper.addEventListener(
            this.closeBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onClose
        );

        this.eventListenerHelper.addEventListener(
            this.additionalInfoBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onAdditionalInfo
        );

        this.eventListenerHelper.addEventListener(
            this.moveHelperBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onMoveHelper
        );

        this.eventListenerHelper.addEventListener(
            InputManager.instance,
            InputManagerEvent.KEY_DOWN,
            this.onKeyDown
        );
    }

    private onTick():void {
        if (this.visible) {
            /*if (this.lastCheckedPos.x != EngineAdapter.instance.globalMouseX ||
             this.lastCheckedPos.y != EngineAdapter.instance.globalMouseY) {*/

            this.lastCheckedPos.x = EngineAdapter.instance.globalMouseX;
            this.lastCheckedPos.y = EngineAdapter.instance.globalMouseY;

            let underPointData:IObjectUnderPointVO = EngineAdapter.instance.getNativeObjectsUnderPoint(
                EngineAdapter.instance.stage.object,
                EngineAdapter.instance.globalMouseX,
                EngineAdapter.instance.globalMouseY
            );

            if (this.forceUpdateUnderPointView || !this.checkUnderPointDataEqual(underPointData, this.lastUnderPointData)) {

                this.forceUpdateUnderPointView = false;
                this.lastUnderPointData = underPointData;

                this.lastAllObjectsUnderPointList = [];
                this.parseUnderPointDataToSingleList(this.lastUnderPointData, this.lastAllObjectsUnderPointList);

                let listText:string = this.parseUnderPointData(underPointData);
                this.displayListField.text = listText;

                this.arrange();
            }
            // }
        }
    }

    protected onCaptureKey():void {
        super.onCaptureKey();

        let underPointData:IObjectUnderPointVO = EngineAdapter.instance.getNativeObjectsUnderPoint(
            EngineAdapter.instance.stage.object,
            EngineAdapter.instance.globalMouseX,
            EngineAdapter.instance.globalMouseY
        );

        // Log the parsed structure
        console.group("Display list structure:");
        this.groupLogUnderPointData(underPointData);
        console.groupEnd();
    }

    protected onAdditionalInfo():void {
        this.isAdditionalInfoEnabled = !this.isAdditionalInfoEnabled;
    }

    protected onMoveHelper():void {
        this.isMoveHelperEnabled = !this.isMoveHelperEnabled;
    }

    protected onKeyDown(data:InputManagerEventData):void {
        if (this.isMoveHelperEnabled) {
            let tempCode:number = KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            if (tempCode == KeyCodes.CONTROL) {
                this.moveObjectIndex--;
                this.commitData();

            } else if (DisplayListView.ARROW_KEY_CODES.indexOf(tempCode) != -1) {
                if (this.moveObjectWrapper.object) {
                    let tempChangeX:number = 0;
                    let tempChangeY:number = 0;

                    if (tempCode == KeyCodes.LEFT_ARROW) {
                        tempChangeX = -1;
                    } else if (tempCode == KeyCodes.RIGHT_ARROW) {
                        tempChangeX = 1;
                    }

                    if (tempCode == KeyCodes.UP_ARROW) {
                        tempChangeY = -1;
                    } else if (tempCode == KeyCodes.DOWN_ARROW) {
                        tempChangeY = 1;
                    }

                    if (InputManager.instance.checkIfKeyDown(KeyCodes.SHIFT)) {
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
    }

    private parseUnderPointData(data:IObjectUnderPointVO, prefix:string = "∟"):string {
        let result:string = "";

        if (data && data.object) {
            let tempName:string = data.object.toString();
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
                if (data.object == this.moveObjectWrapper.object) {
                    result += " " + FC.config.localization.movableObjectText;
                }
            }

            if (this.isAdditionalInfoEnabled) {
                if (FC.config.displayListSettings.additionalInfoParams) {
                    result += " - { ";

                    let parsedData;
                    let tempParamConfig;

                    let keys:string[] = Object.keys(FC.config.displayListSettings.additionalInfoParams);
                    let tempKey:string;
                    let tempVisualKey:string;
                    let keysCount:number = keys.length;
                    for (let keyIndex:number = 0; keyIndex < keysCount; keyIndex++) {
                        tempKey = keys[keyIndex];

                        if (data.object[tempKey] !== undefined) {

                            if (keyIndex > 0) {
                                result += ", "
                            }

                            parsedData = data.object[tempKey];
                            //
                            tempParamConfig = FC.config.displayListSettings.additionalInfoParams[tempKey];
                            if (tempParamConfig.toFixed || tempParamConfig.toFixed === 0) {
                                if (parsedData !== Math.floor(parsedData)) {
                                    parsedData = (parsedData as number).toFixed(tempParamConfig.toFixed);
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
                let childPrefix:string = "- " + prefix;
                let childrenCount:number = data.children.length;
                for (let childIndex:number = 0; childIndex < childrenCount; childIndex++) {
                    result += "\n" + this.parseUnderPointData(data.children[childIndex], childPrefix);
                }
            }
        }

        return result;
    }

    private groupLogUnderPointData(data:IObjectUnderPointVO, prefix:string = "∟"):void {
        if (data && data.object) {

            //console.log(data.object);
            //console.dir(data.object);
            console.log(prefix, data.object);

            if (data.children && data.children.length > 0) {
                // console.group(" children");

                let childrenCount:number = data.children.length;
                for (let childIndex:number = 0; childIndex < childrenCount; childIndex++) {
                    this.groupLogUnderPointData(data.children[childIndex], "    " + prefix);
                }

                // console.groupEnd();
            }
        }
    }

    private checkUnderPointDataEqual(data1:IObjectUnderPointVO, data2:IObjectUnderPointVO):boolean {
        let result:boolean = true;

        // If one of the data objects exists and other doesn't
        if (!!data1 != !!data2) {
            result = false;

            // If 2 data objects are available
        } else if (data1 && data2) {

            if (data1.object != data2.object) {
                result = false;

                // If one of data has children and other doesn't have
            } else if (!!data1.children != !!data2.children) {
                result = false;

                // If there are children arrays in the both data objects
            } else if (data1.children && data2.children) {
                // If length of the children lists are not equal, then data objects are not equal too
                if (data1.children.length != data2.children.length) {
                    result = false;

                } else {

                    let childrenCount:number = data1.children.length;
                    for (let childIndex:number = 0; childIndex < childrenCount; childIndex++) {
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
    }

    private parseUnderPointDataToSingleList(data:IObjectUnderPointVO, list:any[]):void {
        if (data && data.object) {
            list.push(data.object);

            if (data.children && data.children.length > 0) {
                let childrenCount:number = data.children.length;
                for (let childIndex:number = 0; childIndex < childrenCount; childIndex++) {
                    this.parseUnderPointDataToSingleList(data.children[childIndex], list);
                }
            }
        }
    }


    get isAdditionalInfoEnabled():boolean {
        return this._isAdditionalInfoEnabled;
    }

    set isAdditionalInfoEnabled(value:boolean) {
        if (value == this._isAdditionalInfoEnabled) {
            return;
        }

        this._isAdditionalInfoEnabled = value;

        this.commitData();
    }


    get isMoveHelperEnabled():boolean {
        return this._isMoveHelperEnabled;
    }

    set isMoveHelperEnabled(value:boolean) {
        if (value == this._isMoveHelperEnabled) {
            return;
        }

        this._isMoveHelperEnabled = value;

        this.commitData();
    }


    protected commitData():void {
        super.commitData();

        if (!this.visible) {
            this.isAdditionalInfoEnabled = false;
            this.isMoveHelperEnabled = false;
        }

        if (this.additionalInfoBtn) {
            if (this.isAdditionalInfoEnabled) {
                this.additionalInfoBtn.label = FC.config.localization.additionalInfoBtnPressedLabel;
            } else {
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
                    this.moveObjectWrapper.object = this.lastAllObjectsUnderPointList[this.moveObjectIndex];

                } else {
                    this.moveObjectWrapper.object = null;
                }

            } else {
                this.moveHelperBtn.label = FC.config.localization.moveHelperBtnNormalLabel;
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
    }
}