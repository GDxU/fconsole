import {EventListenerHelper, KeyboardTools, Logger, ObjectTools} from "fcore";
import {
    InputManager,
    InputManagerEvent,
    InputManagerEventData,
    FApp,
    Point,
    DisplayObjectContainer,
    DisplayTools,
    FContainer
} from "fsuite";

import {ConsoleView} from "./view/ConsoleView";
import {BaseConsoleView} from "./view/BaseConsoleView";
import {DisplayListView} from "./view/DisplayListView";
import {Config} from "./Config";
import {TooltipManager} from "../tooltip/TooltipManager";
import {ConsoleTooltip} from "./view/tooltip/ConsoleTooltip";

export class FC {
    private static eventListenerHelper: EventListenerHelper;

    private static _root: DisplayObjectContainer;
    private static contentCont: DisplayObjectContainer;
    private static viewsCont: DisplayObjectContainer;
    private static tooltipsCont: DisplayObjectContainer;

    // private static password: string = "";
    private static passwordInputIndex: number = 0;

    public static config: Config;
    public static tooltipManager: TooltipManager;

    public static view: ConsoleView;
    public static displayListView: DisplayListView;

    static startInit(root?: DisplayObjectContainer, configChanges?: any | Partial<Config>): void {

        Logger.log("CC: ", FC);

        const config: Config = new Config();
        if (configChanges) {
            ObjectTools.copyProps(config, configChanges);
        }
        FC.config = config;

        FC.eventListenerHelper = new EventListenerHelper(FC);

        // FC.contentCont = new FContainer();
        FC.contentCont = new FContainer();

        // FC.viewsCont = new FContainer();
        FC.viewsCont = new FContainer();
        FC.contentCont.addChild(FC.viewsCont);

        // FC.tooltipsCont = new FContainer();
        FC.tooltipsCont = new FContainer();
        FC.contentCont.addChild(FC.tooltipsCont);

        let tempTooltip = new ConsoleTooltip();
        FC.tooltipManager = new TooltipManager(tempTooltip);
        FC.tooltipManager.tooltipCont = FC.tooltipsCont;
        FC.tooltipManager.mouseShift = new Point(10, 15);

        // View
        FC.view = new ConsoleView();
        FC.hideView(FC.view);
        //
        FC.displayListView = new DisplayListView();
        FC.hideView(FC.displayListView);

        // Events
        FC.eventListenerHelper.addEventListener(
            InputManager.instance,
            InputManagerEvent.KEY_DOWN,
            (data: InputManagerEventData): void => {
                let pressedKey: string = KeyboardTools.getKeyFromKeyPressEvent(data.nativeEvent);
                if (pressedKey === FC.config.password.charAt(FC.passwordInputIndex)) {
                    FC.passwordInputIndex++;

                    if (FC.passwordInputIndex >= FC.config.password.length) {
                        FC.onPasswordInput();
                        FC.passwordInputIndex = 0;
                    }

                } else {
                    FC.passwordInputIndex = 0;
                }
            }
        );

        FApp.instance.ticker.add(FC.onTicker);

        FC.root = root;
        FC.visible = FC.config.console.defaultVisible;
    }

    private static onTicker(): void {
        if (FC.config.console.aboveAll) {
            DisplayTools.moveObjectToTopLayer(FC.contentCont);
        }
    }

    private static onPasswordInput(): void {
        FC.visible = !FC.visible;
    }

    public static get visible(): boolean {
        return FC.view.visible;
    }

    public static set visible(value: boolean) {
        if (value) {
            FC.showView(FC.view, false);
            DisplayTools.moveObjectToTopLayer(FC.viewsCont);
            DisplayTools.moveObjectToTopLayer(FC.tooltipsCont);

        } else {
            FC.hideView(FC.view);
        }
    }


    public static showView(view: BaseConsoleView, moveToMouse: boolean = true): void {
        FC.viewsCont.addChild(view.view);

        view.visible = true;
        FC.moveViewToTopLayer(view);

        if (moveToMouse) {
            const globalPos: Point = FApp.instance.getGlobalInteractionPosition();
            let localPos: Point = view.view.parent.toLocal(
                new Point(globalPos.x + 1, globalPos.y + 1)
            );
            view.view.x = localPos.x;
            view.view.y = localPos.y;
        }
    }

    public static hideView(view: BaseConsoleView): void {
        if (view.view.parent) {
            view.view.parent.removeChild(view.view);
        }
        view.visible = false;
    }

    public static toggleView(view: BaseConsoleView, moveToMouse: boolean = true): void {
        if (view.visible) {
            FC.hideView(view);
        } else {
            FC.showView(view, moveToMouse);
        }
    }

    public static moveViewToTopLayer(view: BaseConsoleView): void {
        DisplayTools.moveObjectToTopLayer(view.view);
    }


    static get root(): DisplayObjectContainer {
        return FC._root;
    }

    static set root(value: DisplayObjectContainer) {
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