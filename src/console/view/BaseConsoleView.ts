import {BaseObject} from "fcore";
import {DisplayObjectContainer, Graphics, FLabel, DragHelper, DragHelperEvent, FContainer} from "fsuite";

import {FC} from "../FC";
import {BaseConsoleButton} from "./BaseConsoleButton";
import {CaptureKeyButton} from "./capturekey/CaptureKeyButton";
import {CaptuerKeyButtonEvent} from "./capturekey/CaptureKeyButtonEvent";
import {ITooltipData} from "../../tooltip/ITooltipData";

export class BaseConsoleView extends BaseObject {

    private static CAPTURE_LABEL_FIRST_PART: string = "Capture key:";
    private static NO_CAPTURE_KEY_TEXT: string = "(click to add)";

    public view: DisplayObjectContainer;
    private bgGraphics: Graphics;

    protected contentCont: FContainer;
    protected titleCont: FContainer;
    protected insideContentCont: FContainer;

    private _visible: boolean;

    private dragHelper: DragHelper;
    private viewDragStartX: number;
    private viewDragStartY: number;

    private topLevelElements: DisplayObjectContainer[];
    private topLevelCont: DisplayObjectContainer;

    protected titleLabel: FLabel;
    private _titleVisible: boolean;

    protected captureBtn: CaptureKeyButton;
    private _captureVisible: boolean;
    // private captureKey:string;

    public lastBgWidth: number = 0;
    public lastBgHeight: number = 0;

    protected construction(): void {
        super.construction();

        // this.captureKey = "";

        this._titleVisible = true;
        this._captureVisible = false;

        this.topLevelElements = [];

        this.view = new FContainer();

        this.bgGraphics = new Graphics();
        this.view.addChild(this.bgGraphics);
        //
        this.bgGraphics.interactive = true;

        this.dragHelper = new DragHelper();
        this.dragHelper.view = (this.bgGraphics as any);

        this.contentCont = new FContainer();
        this.view.addChild(this.contentCont);

        this.titleCont = new FContainer();
        this.contentCont.addChild(this.titleCont);

        this.titleLabel = new FLabel({
            autosize: true,
            color: FC.config.viewSettings.titleLabelColor,
            size: FC.config.viewSettings.titleLabelSize
        });
        this.titleCont.addChild(this.titleLabel);
        this.titleLabel.text = "Test Title";

        this.topLevelCont = new FContainer();
        this.titleCont.addChild(this.topLevelCont);

        this.captureBtn = new CaptureKeyButton();
        this.titleCont.addChild(this.captureBtn.view);
        this.captureBtn.view.y = this.titleLabel.y + this.titleLabel.height;
        //
        this.captureBtn.tooltipData = {title: FC.config.localization.captureKeyBtnTooltipTitle};

        this.insideContentCont = new FContainer();
        this.contentCont.addChild(this.insideContentCont);
    }


    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.dragHelper,
            DragHelperEvent.DRAG_START,
            this.onDragStart
        );
        this.eventListenerHelper.addEventListener(
            this.dragHelper,
            DragHelperEvent.DRAG_UPDATE,
            this.onDragUpdate
        );

        this.eventListenerHelper.addEventListener(
            this.captureBtn,
            CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS,
            this.onCaptureKey
        );
    }

    private onDragStart(): void {
        this.viewDragStartX = this.view.x;
        this.viewDragStartY = this.view.y;

        FC.moveViewToTopLayer(this);
    }

    private onDragUpdate(): void {
        this.view.x = this.viewDragStartX + this.dragHelper.changeDragGlobalX;
        this.view.y = this.viewDragStartY + this.dragHelper.changeDragGlobalY;
    }

    protected onClose(): void {
        FC.hideView(this);
    }

    protected onCaptureKey(): void {

    }


    public get visible(): boolean {
        return this._visible;
    }

    public set visible(value: boolean) {
        if (value == this.visible) {
            return;
        }
        this._visible = value;

        this.commitData();
    }

    protected commitData(): void {
        super.commitData();

        this.view.visible = this.visible;
        this.titleLabel.visible = this.titleVisible;
        this.captureBtn.view.visible = this.captureVisible;

        this.arrange();
    }

    protected arrange(): void {

        // Reset previously set changes

        let tempBtn: DisplayObjectContainer;
        let prevBtn: DisplayObjectContainer;
        let btnsCount: number = this.topLevelElements.length;
        for (let btnIndex: number = 0; btnIndex < btnsCount; btnIndex++) {
            tempBtn = this.topLevelElements[btnIndex];
            if (prevBtn) {
                tempBtn.x = prevBtn.x + prevBtn.width + 5;
            }

            prevBtn = tempBtn;
        }

        if (this.titleVisible) {
            this.topLevelCont.x = this.titleLabel.x + this.titleLabel.width + 10;
        } else {
            this.topLevelCont.x = this.titleLabel.x;
        }

        if (this.insideContentCont.visible) {
            this.insideContentCont.y = this.titleCont.y + this.titleCont.height;
        } else {
            this.insideContentCont.y = 0;
        }

        let tempWidth: number = this.contentCont.width + FC.config.viewSettings.bgToContentShift.x;
        let tempHeight: number = this.contentCont.height + FC.config.viewSettings.bgToContentShift.y;
        if (tempWidth != this.lastBgWidth || tempHeight != this.lastBgHeight) {

            this.lastBgWidth = tempWidth;
            this.lastBgHeight = tempHeight;

            this.bgGraphics.clear();
            this.bgGraphics.beginFill(FC.config.viewSettings.bgColor, FC.config.viewSettings.bgAlpha);
            this.bgGraphics.lineStyle(FC.config.viewSettings.borderWidth, FC.config.viewSettings.borderColor, FC.config.viewSettings.borderAlpha);
            this.bgGraphics.drawRect(
                0,
                0,
                tempWidth,
                tempHeight
            );
            this.bgGraphics.endFill();
        }

        this.contentCont.x = this.bgGraphics.x + ((this.bgGraphics.width - this.contentCont.width) >> 1);
        this.contentCont.y = this.bgGraphics.y + ((this.bgGraphics.height - this.contentCont.height) >> 1);
    }

    protected createTitleBtn(label: string, tooltipData?: ITooltipData): BaseConsoleButton {
        let tempBtn = new BaseConsoleButton();
        tempBtn.label = label;
        tempBtn.tooltipData = tooltipData;

        this.addTitleElement(tempBtn.view);

        return tempBtn;
    }

    protected addTitleElement(element: DisplayObjectContainer): void {
        this.topLevelCont.addChild(element);
        this.topLevelElements.push(element);
    }

    get titleVisible(): boolean {
        return this._titleVisible;
    }

    set titleVisible(value: boolean) {
        if (value == this.titleVisible) {
            return;
        }

        this._titleVisible = value;

        this.commitData();
    }

    get captureVisible(): boolean {
        return this._captureVisible;
    }

    set captureVisible(value: boolean) {
        if (value == this.captureVisible) {
            return;
        }

        this._captureVisible = value;

        this.commitData();
    }
}