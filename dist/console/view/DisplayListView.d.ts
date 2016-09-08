import { BaseConsoleView } from "./BaseConsoleView";
import { BaseConsoleButton } from "./BaseConsoleButton";
export declare class DisplayListView extends BaseConsoleView {
    private lastCheckedPos;
    private displayListField;
    private closeBtn;
    private lastUnderPointData;
    protected additionalInfoBtn: BaseConsoleButton;
    private _isAdditionalInfoPressed;
    constructor();
    protected construction(): void;
    protected addListeners(): void;
    private onTick();
    protected onCaptureKey(): void;
    protected onAdditionalBtn(): void;
    private getObjectsUnderMouse();
    private parseUnderPointData(data, prefix?);
    private groupLogUnderPointData(data, prefix?);
    private checkUnderPointDataEqual(data1, data2);
    isAdditionalInfoPressed: boolean;
    protected commitData(): void;
}
