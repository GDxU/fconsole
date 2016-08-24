import {IDisplayObjectContainerWrapper, EngineAdapter, DisplayObjectTools} from "fgraphics/dist/index";
import {ConsoleView} from "./view/ConsoleView";
import {BaseConsoleView} from "./view/BaseConsoleView";
import {DisplayListView} from "./view/DisplayListView";
import {EventListenerHelper, KeyboardTools} from "fcore/dist/index";
import {InputManager, InputManagerEvent, InputManagerEventData} from "flibs/dist/index";
import {Config} from "./Config";

export class CC {
    private static eventListenerHelper:EventListenerHelper<any> = new EventListenerHelper();

    private static root:IDisplayObjectContainerWrapper;
    private static password:string = "";
    private static passwordInputIndex:number = 0;

    public static config:Config;

    private static view:ConsoleView;
    public static displayListView:DisplayListView;

    static startInit(root:any, password:string = "`", config?:Config):void {

        // Config
        CC.root = EngineAdapter.instance.createDisplayWrapperBasedOnObject<IDisplayObjectContainerWrapper>(root);
        CC.password = password;

        if (!config) {
            config = new Config();
        }
        CC.config = config;

        // View
        CC.view = new ConsoleView();
        CC.displayListView = new DisplayListView();

        // Events
        CC.eventListenerHelper.addEventListener(
            InputManager.instance,
            InputManagerEvent.KEY_PRESS,
            (data:InputManagerEventData):void => {
                let charCode:number = KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);

                if (charCode === CC.password.charCodeAt(CC.passwordInputIndex)) {
                    CC.passwordInputIndex++;

                    if (CC.passwordInputIndex >= CC.password.length) {
                        CC.onPasswordInput();
                        CC.passwordInputIndex = 0;
                    }

                } else {
                    CC.passwordInputIndex = 0;
                }
            }
        );
    }

    private static onPasswordInput():void {
        CC.visible = !CC.visible;
    }

    public static get visible():boolean {
        return CC.view.visible;
    }
    public static set visible(value:boolean) {
        if (value) {
            CC.showView(CC.view, false);
        }else {
            CC.hideView(CC.view);
        }
    }


    public static showView(view:BaseConsoleView, moveToMouse:boolean = true):void {
        CC.root.addChild(view.view);
        view.visible = true;
        CC.moveViewToTopLayer(view);

        if (moveToMouse) {
            view.view.x = EngineAdapter.instance.globalMouseX + 1;
            view.view.y = EngineAdapter.instance.globalMouseY + 1;
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
            CC.hideView(view);
        }else {
            CC.showView(view, moveToMouse);
        }
    }

    public static moveViewToTopLayer(view:BaseConsoleView):void {
        DisplayObjectTools.moveObjectToTopLayer(view.view);

    }
}