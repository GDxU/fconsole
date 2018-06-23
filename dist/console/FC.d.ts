/// <reference types="pixi.js" />
import { DisplayObjectContainer } from "fsuite";
import { ConsoleView } from "./view/ConsoleView";
import { BaseConsoleView } from "./view/BaseConsoleView";
import { DisplayListView } from "./view/DisplayListView";
import { Config } from "./Config";
import { TooltipManager } from "../tooltip/TooltipManager";
export declare class FC {
    private static eventListenerHelper;
    private static _root;
    private static contentCont;
    private static viewsCont;
    private static tooltipsCont;
    private static password;
    private static passwordInputIndex;
    static config: Config;
    static tooltipManager: TooltipManager;
    static view: ConsoleView;
    static displayListView: DisplayListView;
    static startInit(root?: DisplayObjectContainer, password?: string, config?: Config): void;
    private static onTicker();
    private static onPasswordInput();
    static visible: boolean;
    static showView(view: BaseConsoleView, moveToMouse?: boolean): void;
    static hideView(view: BaseConsoleView): void;
    static toggleView(view: BaseConsoleView, moveToMouse?: boolean): void;
    static moveViewToTopLayer(view: BaseConsoleView): void;
    static root: DisplayObjectContainer;
}
