/// <reference types="pixi.js" />
import { DisplayObjectContainer } from "fsuite";
import { BaseObject } from "fcore";
import { ITooltipData } from "./ITooltipData";
export declare abstract class BaseTooltip extends BaseObject {
    view: DisplayObjectContainer;
    protected tooltipData: ITooltipData;
    protected construction(): void;
    protected commitData(): void;
}
