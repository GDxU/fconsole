import {BaseConsoleView} from "./BaseConsoleView";
import {
    EngineAdapter,
    TickerEvent,
    IObjectUnderPointVO,
    ITextWrapper,
    DisplayObjectWrapperMouseEvent
} from "fgraphics/dist/index";
import {Point} from "fcore/dist/index";
import {BaseConsoleButton} from "./BaseConsoleButton";
import {CC} from "../CC";

export class DisplayListView extends BaseConsoleView {

    private lastCheckedPos:Point;
    private displayListField:ITextWrapper;
    private closeBtn:BaseConsoleButton;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

        this.captureVisible = true;

        this.lastCheckedPos = new Point();
        this.titleLabel.text = "Display List";

        this.displayListField = EngineAdapter.instance.createTextWrapper();
        this.contentCont.addChild(this.displayListField);
        this.displayListField.y = this.titleCont.y + this.titleCont.height + 5;
        this.displayListField.color = CC.config.displayListSettings.hierarchyLabelColor;
        this.displayListField.size = CC.config.displayListSettings.hierarchyLabelSize;

        this.closeBtn = this.createTitleBtn(
            "X",
            {title: CC.config.localization.closeBtnTooltipTitle}
        );
    }

    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            EngineAdapter.instance.mainTicker,
            TickerEvent.TICK,
            this.onTick
        );

        this.eventListenerHelper.addEventListener(
            this.closeBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onClose
        );
    }

    private onTick():void {
        if (this.visible) {
            if (this.lastCheckedPos.x != EngineAdapter.instance.globalMouseX ||
                this.lastCheckedPos.y != EngineAdapter.instance.globalMouseY) {

                this.lastCheckedPos.x = EngineAdapter.instance.globalMouseX;
                this.lastCheckedPos.y = EngineAdapter.instance.globalMouseY;

                let underPointData:IObjectUnderPointVO = EngineAdapter.instance.getNativeObjectsUnderPoint(
                    EngineAdapter.instance.stage.object,
                    EngineAdapter.instance.globalMouseX,
                    EngineAdapter.instance.globalMouseY
                );

                let listText:string = this.parseUnderPointData(underPointData);
                this.displayListField.text = listText;

                this.arrange();
            }
        }
    }

    protected onCaptureKey():void {
        super.onCaptureKey();

        let underPointData:IObjectUnderPointVO = EngineAdapter.instance.getNativeObjectsUnderPoint(
            EngineAdapter.instance.stage.object,
            EngineAdapter.instance.globalMouseX,
            EngineAdapter.instance.globalMouseY
        );

        // Log the parsed structure
        console.group("Display list structure:");
        this.groupLogUnderPointData(underPointData);
        console.groupEnd();
    }

    private getObjectsUnderMouse():IObjectUnderPointVO {
        return EngineAdapter.instance.getNativeObjectsUnderPoint(
            EngineAdapter.instance.stage.object,
            EngineAdapter.instance.globalMouseX,
            EngineAdapter.instance.globalMouseY
        );
    }

    private parseUnderPointData(data:IObjectUnderPointVO, prefix:string = "∟"):string {
        let result:string = "";

        if (data && data.object) {
            let tempName:string = data.object.toString();
            if (data.object.constructor) {
                tempName = data.object.constructor.name;
            }

            result += prefix + " " + tempName;

            let childPrefix:string = "- " + prefix;
            let childrenCount:number = data.children.length;
            for (let childIndex:number = 0; childIndex < childrenCount; childIndex++) {
                result += "\n" + this.parseUnderPointData(data.children[childIndex], childPrefix);
            }
        }

        return result;
    }

    private groupLogUnderPointData(data:IObjectUnderPointVO, prefix:string = "∟"):void {
        if (data && data.object) {

            //console.log(data.object);
            //console.dir(data.object);
            console.log(prefix, data.object);

            if (data.children && data.children.length > 0) {
                // console.group(" children");

                let childrenCount:number = data.children.length;
                for (let childIndex:number = 0; childIndex < childrenCount; childIndex++) {
                    this.groupLogUnderPointData(data.children[childIndex], "    " + prefix);
                }

                // console.groupEnd();
            }
        }
    }
}