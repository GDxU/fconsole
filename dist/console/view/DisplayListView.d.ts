import { InputManagerEventData } from "fsuite";
import { BaseConsoleView } from "./BaseConsoleView";
import { BaseConsoleButton } from "./BaseConsoleButton";
export declare class DisplayListView extends BaseConsoleView {
    private static ARROW_KEY_CODES;
    private lastCheckedPos;
    private displayListField;
    private closeBtn;
    private lastUnderPointData;
    private lastAllObjectsUnderPointList;
    private forceUpdateUnderPointView;
    protected additionalInfoBtn: BaseConsoleButton;
    private _isAdditionalInfoEnabled;
    protected moveHelperBtn: BaseConsoleButton;
    private _isMoveHelperEnabled;
    private moveObject;
    private prevMoveObject;
    private moveObjectIndex;
    constructor();
    protected construction(): void;
    destruction(): void;
    protected addListeners(): void;
    protected removeListeners(): void;
    private onTick();
    protected onCaptureKey(): void;
    protected onAdditionalInfo(): void;
    protected onMoveHelper(): void;
    protected onKeyDown(data: InputManagerEventData): void;
    private parseUnderPointData(data, prefix?);
    private groupLogUnderPointData(data, prefix?);
    private checkUnderPointDataEqual(data1, data2);
    private parseUnderPointDataToSingleList(data, list);
    isAdditionalInfoEnabled: boolean;
    isMoveHelperEnabled: boolean;
    protected commitData(): void;
}
