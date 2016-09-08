import {BaseConsoleView} from "./BaseConsoleView";
import {FC} from "../FC";
import {BaseConsoleButton} from "./BaseConsoleButton";
import {DisplayObjectWrapperMouseEvent} from "fgraphics/dist/index";
export class ConsoleView extends BaseConsoleView {

    private displayListBtn:BaseConsoleButton;
    private closeBtn:BaseConsoleButton;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

        this.titleVisible = false;

        this.displayListBtn = this.createTitleBtn(
            "DL",
            {
                title: FC.config.localization.displayListBtnTooltipTitle,
                text: FC.config.localization.displayListBtnTooltipText
            }
        );
        this.closeBtn = this.createTitleBtn(
            "X",
            {title: FC.config.localization.closeBtnTooltipTitle}
        );
    }

    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.displayListBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onDisplayListClick
        );

        this.eventListenerHelper.addEventListener(
            this.closeBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onClose
        );
    }


    private onDisplayListClick():void {
        FC.toggleView(FC.displayListView);
    }
}