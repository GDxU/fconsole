import {DisplayObjectContainer, FContainer} from "fsuite";
import {BaseObject} from "fcore";

import {ITooltipData} from "./ITooltipData";

export abstract class BaseTooltip extends BaseObject {

    public view:DisplayObjectContainer;

    protected tooltipData:ITooltipData;


    protected construction():void {
        super.construction();

        this.view = new FContainer();
    }


    protected commitData():void {
        super.commitData();

        this.tooltipData = (this.data as ITooltipData);
    }
}