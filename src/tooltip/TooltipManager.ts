import {BaseEventListenerObject} from "fcore/dist/index";

export class TooltipManager extends BaseEventListenerObject {

    // private static SHOW_DELAY:Number = 0.5;
    //
    // // Контейнер для всплывающих подсказок
    // private _tooltipCont:IDisplayObjectContainerWrapper;
    // private tooltipInsideCont:IDisplayObjectContainerWrapper;
    // // Всплывающая подсказка
    // //private tooltip:BaseTooltip;
    // private tooltip:BaseTooltip;
    // // Смещение подсказки относительно мышки
    // public mouseShift:Point;
    //
    //
    // private _visible:boolean;
    //
    // // Предыдущая позиция поп-апа
    // // private prevTooltipPos:Point;
    //
    // // Переменная для улучшения производительности
    // private tempLocalMousePos:Point;
    //
    // constructor() {
    //     super();
    // }
    //
    //
    // protected construction():void {
    //     super.construction();
    //
    //     this.mouseShift = new Point();
    //
    //     this.tooltipInsideCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
    //     this.tooltipInsideCont.addChild(this.tooltip.view);
    //     this.tooltipInsideCont.visible = false;
    //
    //     this.hide();
    // }
    //
    // protected addListeners():void {
    //     super.addListeners();
    //
    //     this.eventListenerHelper.addEventListener(
    //         EngineAdapter.instance.mainTicker,
    //         TickerEvent.TICK,
    //         this.onTick
    //     )
    // }
    //
    // private onTick():void {
    //     this.update();
    // }
    //
    //
    // public show(data:ITooltipData):void {
    //     // this.setIsShow(true);
    //     this.tooltip.data = data;
    //
    //     this.update();
    // }
    //
    // public hide():void {
    //     // this.setIsShow(false);
    // }
    //
    //
    // /**
    //  * Обновление подсказки.
    //  */
    // public update():void {
    //     if (!this.visible) {
    //         return;
    //     }
    //     if (!this.tooltipCont) {
    //         return;
    //     }
    //
    //     this.movePopupToMouse();
    // }
    //
    // private movePopupToMouse():void {
    //     if (!this.tooltipCont) {
    //         return;
    //     }
    //
    //     /*//var localMousePos:Point = new Point(this.tooltipCont.mouseX, this.tooltipCont.mouseY);
    //     this.tempLocalMousePos.x = this.tooltipCont.mouseX;
    //     this.tempLocalMousePos.y = this.tooltipCont.mouseY;
    //     var newPos:Point = this.tempLocalMousePos.clone();
    //     newPos.add(this.mouseShift.x, this.mouseShift.y);
    //     var newGlobalPos:Point = this.tooltipCont.localToGlobal(newPos);
    //
    //     //var isMoreStageWidth:Boolean;
    //     //var isMoreStageHeight:Boolean;
    //     var moreStageWidthDelta:Number = 0;
    //     var moreStageHeightDelta:Number = 0;
    //
    //     if (newGlobalPos.x < 0) {
    //         newPos.x += -1 * newGlobalPos.x;
    //     } else if (newGlobalPos.x + this.tooltip.width > this.tooltipCont.stage.stageWidth) {
    //         moreStageWidthDelta = (newGlobalPos.x + this.tooltip.width) - this.tooltipCont.stage.stageWidth;
    //
    //         newPos.x += this.tooltipCont.stage.stageWidth - (newGlobalPos.x + this.tooltip.width);
    //
    //         //isMoreStageWidth = true;
    //     }
    //
    //     if (newGlobalPos.y < 0) {
    //         newPos.y += -1 * newGlobalPos.y;
    //     } else if (newGlobalPos.y + this.tooltip.height > this.tooltipCont.stage.stageHeight) {
    //         moreStageHeightDelta = (newGlobalPos.y + this.tooltip.height) - this.tooltipCont.stage.stageHeight
    //
    //         newPos.y += this.tooltipCont.stage.stageHeight - (newGlobalPos.y + this.tooltip.height);
    //
    //         //isMoreStageHeight = true;
    //     }
    //
    //
    //     if (moreStageWidthDelta > 0 && moreStageHeightDelta > 0) {
    //         // Если по X тултип вышел дальше, чем по Y
    //         if (moreStageWidthDelta > moreStageHeightDelta) {
    //             newPos.x = this.tempLocalMousePos.x - this.tooltip.view.width;
    //
    //             // Если по Y вышел дальше, чем по X
    //         } else {
    //             newPos.y = this.tempLocalMousePos.y - this.tooltip.view.height;
    //         }
    //
    //     }
    //
    //
    //     this.movePopupTo(newPos.x, newPos.y);*/
    // }
    //
    // protected movePopupTo(x:number, y:number):void {
    //     this.tooltip.view.x = x;
    //     this.tooltip.view.y = y;
    // }
    //
    //
    // public get tooltipCont():IDisplayObjectContainerWrapper {
    //     return this._tooltipCont;
    // }
    // public set tooltipCont(value:IDisplayObjectContainerWrapper):void {
    //     if (this.tooltipCont == value) {
    //         return;
    //     }
    //
    //     this._tooltipCont = value;
    //
    //     if (this.tooltipCont) {
    //         this.tooltipCont.addChild(this.tooltipInsideCont);
    //     }
    //
    //     this.update();
    // }
    //
    //
    //
    // get visible():boolean {
    //     return this._visible;
    // }
    // set visible(value:boolean) {
    //     if (value == this.visible) {
    //         return;
    //     }
    //
    //     this._visible = value;
    //
    //     this.tooltipInsideCont.visible = this.visible;
    // }
}