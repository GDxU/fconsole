import {IDisplayObjectContainerWrapper} from "fgraphics/dist/index";
import {ITooltipData} from "./ITooltipData";
import {BaseObject} from "fcore/dist/index";

export class BaseTooltip extends BaseObject {
    public view:IDisplayObjectContainerWrapper;

    private tooltipData:ITooltipData;


    protected commitData():void {
        super.commitData();

        this.tooltipData = (this.data as ITooltipData);
        if (!this.tooltipData) {
            return;
        }
    }
}