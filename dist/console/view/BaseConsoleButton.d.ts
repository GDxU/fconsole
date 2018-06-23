/// <reference types="pixi.js" />
import { DisplayObjectContainer, FLabel } from "fsuite";
import { BaseObject } from "fcore";
import { ITooltipData } from "../../tooltip/ITooltipData";
export declare class BaseConsoleButton extends BaseObject {
    view: DisplayObjectContainer;
    field: FLabel;
    private _label;
    tooltipData: ITooltipData;
    constructor();
    protected construction(): void;
    protected addListeners(): void;
    private onOver();
    private onOut();
    protected onClick(): void;
    protected commitData(): void;
    protected arrange(): void;
    label: string;
}
