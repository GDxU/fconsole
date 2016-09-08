import {BaseTooltip} from "../../../tooltip/BaseTooltip";
import {
    IDisplayObjectContainerWrapper,
    IGraphicsWrapper,
    ITextWrapper,
    EngineAdapter,
    TextWrapperAlign
} from "fgraphics/dist/index";
import {FC} from "../../FC";

export class ConsoleTooltip extends BaseTooltip {

    private contentCont:IDisplayObjectContainerWrapper;
    private titleLabel:ITextWrapper;
    private textLabel:ITextWrapper;

    private bg:IGraphicsWrapper;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

        this.bg = EngineAdapter.instance.createGraphicsWrapper();
        this.view.addChild(this.bg);

        this.contentCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.view.addChild(this.contentCont);

        this.titleLabel = EngineAdapter.instance.createTextWrapper();
        this.contentCont.addChild(this.titleLabel);
        this.titleLabel.align = TextWrapperAlign.CENTER;
        this.titleLabel.color = FC.config.tooltipSettings.titleLabelColor;
        this.titleLabel.size = FC.config.tooltipSettings.titleLabelSize;

        this.textLabel = EngineAdapter.instance.createTextWrapper();
        this.contentCont.addChild(this.textLabel);
        this.textLabel.align = TextWrapperAlign.CENTER;
        this.textLabel.color = FC.config.tooltipSettings.textLabelColor;
        this.textLabel.size = FC.config.tooltipSettings.textLabelSize;
    }


    protected commitData():void {
        super.commitData();

        if (!this.tooltipData) {
            return;
        }

        this.titleLabel.text = this.tooltipData.title;

        this.textLabel.text = this.tooltipData.text;
        if (this.tooltipData.text) {
            this.textLabel.visible = true;
        } else {
            this.textLabel.visible = false;
        }

        this.arrange();
    }

    protected arrange():void {
        super.arrange();

        if (this.textLabel.visible) {
            let labelMaxWidth:number = Math.max(this.titleLabel.width, this.textLabel.width);
            this.titleLabel.x = ((labelMaxWidth - this.titleLabel.width) >> 1);

            this.textLabel.x = ((labelMaxWidth - this.textLabel.width) >> 1);
            this.textLabel.y = this.titleLabel.y + this.titleLabel.height;

        } else {
            this.titleLabel.x = 0;
        }

        this.bg.clear();
        this.bg.beginFill(FC.config.tooltipSettings.bgColor, FC.config.tooltipSettings.bgAlpha);
        this.bg.lineStyle(
            FC.config.tooltipSettings.borderWidth,
            FC.config.tooltipSettings.borderColor,
            FC.config.tooltipSettings.borderAlpha
        );
        this.bg.drawRect(
            0,
            0,
            this.contentCont.width + FC.config.tooltipSettings.bgToContentShift.x,
            this.contentCont.height + FC.config.tooltipSettings.bgToContentShift.y
        );
        this.bg.endFill();

        this.contentCont.x = this.bg.x + ((this.bg.width - this.contentCont.width) >> 1);
        this.contentCont.y = this.bg.y + ((this.bg.height - this.contentCont.height) >> 1);
    }
}