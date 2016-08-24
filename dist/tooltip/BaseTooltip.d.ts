import { IDisplayObjectContainerWrapper } from "fgraphics/dist/index";
import { BaseObject } from "fcore/dist/index";
export declare class BaseTooltip extends BaseObject {
    view: IDisplayObjectContainerWrapper;
    private tooltipData;
    protected commitData(): void;
}
