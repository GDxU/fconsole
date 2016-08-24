import { BaseConsoleView } from "./BaseConsoleView";
export declare class DisplayListView extends BaseConsoleView {
    private lastCheckedPos;
    private displayListField;
    constructor();
    protected construction(): void;
    protected addListeners(): void;
    private onTick();
    protected onCaptureKey(): void;
    private getObjectsUnderMouse();
    private parseUnderPointData(data, prefix?);
    private groupLogUnderPointData(data, prefix?);
}
