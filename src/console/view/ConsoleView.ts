import {BaseConsoleView} from "./BaseConsoleView";
import {FC} from "../FC";
import {BaseConsoleButton} from "./BaseConsoleButton";
import {InteractiveEvent} from "fsuite";

export class ConsoleView extends BaseConsoleView {

    private displayListBtn: BaseConsoleButton;
    private closeBtn: BaseConsoleButton;

    protected construction(): void {
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

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.displayListBtn.view,
            InteractiveEvent.TAP,
            this.onDisplayListClick
        );

        this.eventListenerHelper.addEventListener(
            this.closeBtn.view,
            InteractiveEvent.TAP,
            this.onClose
        );
    }


    private onDisplayListClick(): void {
        FC.toggleView(FC.displayListView);
    }
}