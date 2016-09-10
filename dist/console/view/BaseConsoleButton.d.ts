import { IDisplayObjectContainerWrapper, ITextWrapper } from "fgraphics/dist/index";
import { BaseEventListenerObject } from "fcore/dist/index";
import { ITooltipData } from "../../tooltip/ITooltipData";
export declare class BaseConsoleButton extends BaseEventListenerObject {
    view: IDisplayObjectContainerWrapper;
    field: ITextWrapper;
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
