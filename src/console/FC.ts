import {IDisplayObjectContainerWrapper, EngineAdapter, DisplayObjectTools, TickerEvent} from "fgraphics";
import {ConsoleView} from "./view/ConsoleView";
import {BaseConsoleView} from "./view/BaseConsoleView";
import {DisplayListView} from "./view/DisplayListView";
import {EventListenerHelper, KeyboardTools, Point, Logger} from "fcore/dist/index";
import {InputManager, InputManagerEvent, InputManagerEventData} from "flibs/dist/index";
import {Config} from "./Config";
import {TooltipManager} from "../tooltip/TooltipManager";
import {ConsoleTooltip} from "./view/tooltip/ConsoleTooltip";

export class FC {
    private static eventListenerHelper:EventListenerHelper<any> = new EventListenerHelper();

    private static _root:IDisplayObjectContainerWrapper;
    private static contentCont:IDisplayObjectContainerWrapper;
    private static viewsCont:IDisplayObjectContainerWrapper;
    private static tooltipsCont:IDisplayObjectContainerWrapper;

    private static password:string = "";
    private static passwordInputIndex:number = 0;

    public static config:Config;
    public static tooltipManager:TooltipManager;

    public static view:ConsoleView;
    public static displayListView:DisplayListView;

    static startInit(root?:IDisplayObjectContainerWrapper, password:string = "`", config?:Config):void {

        Logger.log("CC: ", FC);

        FC.contentCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();

        FC.viewsCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        FC.contentCont.addChild(FC.viewsCont);

        FC.tooltipsCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        FC.contentCont.addChild(FC.tooltipsCont);

        FC.password = password;

        if (!config) {
            config = new Config();
        }
        FC.config = config;

        let tempTooltip = new ConsoleTooltip();
        FC.tooltipManager = new TooltipManager(tempTooltip);
        FC.tooltipManager.tooltipCont = FC.tooltipsCont;
        FC.tooltipManager.mouseShift = new Point(10, 15);

        // View
        FC.view = new ConsoleView();
        FC.displayListView = new DisplayListView();

        // Events
        FC.eventListenerHelper.addEventListener(
            InputManager.instance,
            InputManagerEvent.KEY_PRESS,
            (data:InputManagerEventData):void => {
                let charCode:number = KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);

                if (charCode === FC.password.charCodeAt(FC.passwordInputIndex)) {
                    FC.passwordInputIndex++;

                    if (FC.passwordInputIndex >= FC.password.length) {
                        FC.onPasswordInput();
                        FC.passwordInputIndex = 0;
                    }

                } else {
                    FC.passwordInputIndex = 0;
                }
            }
        );
        FC.eventListenerHelper.addEventListener(
            EngineAdapter.instance.mainTicker,
            TickerEvent.TICK,
            () => {
                if (FC.config.console.aboveAll) {
                    DisplayObjectTools.moveObjectToTopLayer(FC.contentCont);
                }
            }
        );

        FC.root = root;
    }

    private static onPasswordInput():void {
        FC.visible = !FC.visible;
    }

    public static get visible():boolean {
        return FC.view.visible;
    }
    public static set visible(value:boolean) {
        if (value) {
            FC.showView(FC.view, false);
            DisplayObjectTools.moveObjectToTopLayer(FC.viewsCont);
            DisplayObjectTools.moveObjectToTopLayer(FC.tooltipsCont);

        }else {
            FC.hideView(FC.view);
        }
    }


    public static showView(view:BaseConsoleView, moveToMouse:boolean = true):void {
        FC.viewsCont.addChild(view.view);
        view.visible = true;
        FC.moveViewToTopLayer(view);

        if (moveToMouse) {
            let localPos:Point = view.view.parent.toLocal(new Point(EngineAdapter.instance.globalMouseX + 1, EngineAdapter.instance.globalMouseY + 1))
            view.view.x = localPos.x;
            view.view.y = localPos.y;
        }
    }

    public static hideView(view:BaseConsoleView):void {
        if (view.view.parent) {
            view.view.parent.removeChild(view.view);
        }
        view.visible = false;
    }

    public static toggleView(view:BaseConsoleView, moveToMouse:boolean = true):void {
        if (view.visible) {
            FC.hideView(view);
        }else {
            FC.showView(view, moveToMouse);
        }
    }

    public static moveViewToTopLayer(view:BaseConsoleView):void {
        DisplayObjectTools.moveObjectToTopLayer(view.view);
    }


    static get root():IDisplayObjectContainerWrapper {
        return FC._root;
    }
    static set root(value:IDisplayObjectContainerWrapper) {
        // Remove from the previous main container, if there was one
        if (FC.root) {
            FC.root.removeChild(FC.contentCont);
        }

        FC._root = value;

        // Add to the new main container, if there is one
        if (FC.root) {
            FC.root.addChild(FC.contentCont);
        }
    }
}