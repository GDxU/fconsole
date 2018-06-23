/// <reference types="pixi.js" />
import { BaseObject } from "fcore";
import { DisplayObjectContainer, Point } from "fsuite";
import { BaseTooltip } from "./BaseTooltip";
import { ITooltipData } from "./ITooltipData";
export declare class TooltipManager extends BaseObject {
    private static SHOW_DELAY;
    private _tooltipCont;
    private tooltipInsideCont;
    private tooltip;
    private _mouseShift;
    private _visible;
    constructor(tooltip: BaseTooltip);
    protected construction(tooltip: BaseTooltip): void;
    protected addListeners(): void;
    protected removeListeners(): void;
    private onTick();
    show(data: ITooltipData): void;
    hide(): void;
    /**
     * Обновление подсказки.
     */
    update(): void;
    /**
     * Move a tooltip to a new position.
     * Might be overridden in subclasses to implement different behavior (e.g. tween movement).
     *
     * @param x
     * @param y
     */
    protected moveTooltipTo(x: number, y: number): void;
    tooltipCont: DisplayObjectContainer;
    mouseShift: Point;
    private visible;
}
