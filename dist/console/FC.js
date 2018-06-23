import { Point, DisplayObjectContainer, DisplayTools } from "fsuite";
import { EventListenerHelper, KeyboardTools, Logger } from "fcore";
import { InputManager, InputManagerEvent, FApp } from "fsuite";
import { ConsoleView } from "./view/ConsoleView";
import { DisplayListView } from "./view/DisplayListView";
import { Config } from "./Config";
import { TooltipManager } from "../tooltip/TooltipManager";
import { ConsoleTooltip } from "./view/tooltip/ConsoleTooltip";
var FC = /** @class */ (function () {
    function FC() {
    }
    FC.startInit = function (root, password, config) {
        if (password === void 0) { password = "`"; }
        Logger.log("CC: ", FC);
        FC.eventListenerHelper = new EventListenerHelper(FC);
        // FC.contentCont = new DisplayObjectContainer();
        FC.contentCont = new DisplayObjectContainer();
        // FC.viewsCont = new DisplayObjectContainer();
        FC.viewsCont = new DisplayObjectContainer();
        FC.contentCont.addChild(FC.viewsCont);
        // FC.tooltipsCont = new DisplayObjectContainer();
        FC.tooltipsCont = new DisplayObjectContainer();
        FC.contentCont.addChild(FC.tooltipsCont);
        FC.password = password;
        if (!config) {
            config = new Config();
        }
        FC.config = config;
        var tempTooltip = new ConsoleTooltip();
        FC.tooltipManager = new TooltipManager(tempTooltip);
        FC.tooltipManager.tooltipCont = FC.tooltipsCont;
        FC.tooltipManager.mouseShift = new Point(10, 15);
        // View
        FC.view = new ConsoleView();
        FC.displayListView = new DisplayListView();
        // Events
        FC.eventListenerHelper.addEventListener(InputManager.instance, InputManagerEvent.KEY_DOWN, function (data) {
            var pressedKey = KeyboardTools.getKeyFromKeyPressEvent(data.nativeEvent);
            if (pressedKey === FC.password.charAt(FC.passwordInputIndex)) {
                FC.passwordInputIndex++;
                if (FC.passwordInputIndex >= FC.password.length) {
                    FC.onPasswordInput();
                    FC.passwordInputIndex = 0;
                }
            }
            else {
                FC.passwordInputIndex = 0;
            }
        });
        /*FC.eventListenerHelper.addEventListener(
            EngineAdapter.instance.mainTicker,
            TickerEvent.TICK,
            () => {
                if (FC.config.console.aboveAll) {
                    DisplayTools.moveObjectToTopLayer(FC.contentCont);
                }
            }
        );*/
        FApp.instance.ticker.add(FC.onTicker);
        FC.root = root;
    };
    FC.onTicker = function () {
        if (FC.config.console.aboveAll) {
            DisplayTools.moveObjectToTopLayer(FC.contentCont);
        }
    };
    FC.onPasswordInput = function () {
        FC.visible = !FC.visible;
    };
    Object.defineProperty(FC, "visible", {
        get: function () {
            return FC.view.visible;
        },
        set: function (value) {
            if (value) {
                FC.showView(FC.view, false);
                DisplayTools.moveObjectToTopLayer(FC.viewsCont);
                DisplayTools.moveObjectToTopLayer(FC.tooltipsCont);
            }
            else {
                FC.hideView(FC.view);
            }
        },
        enumerable: true,
        configurable: true
    });
    FC.showView = function (view, moveToMouse) {
        if (moveToMouse === void 0) { moveToMouse = true; }
        FC.viewsCont.addChild(view.view);
        view.visible = true;
        FC.moveViewToTopLayer(view);
        if (moveToMouse) {
            var globalPos = FApp.instance.getGlobalInteractionPosition();
            var localPos = view.view.parent.toLocal(new Point(globalPos.x + 1, globalPos.y + 1));
            view.view.x = localPos.x;
            view.view.y = localPos.y;
        }
    };
    FC.hideView = function (view) {
        if (view.view.parent) {
            view.view.parent.removeChild(view.view);
        }
        view.visible = false;
    };
    FC.toggleView = function (view, moveToMouse) {
        if (moveToMouse === void 0) { moveToMouse = true; }
        if (view.visible) {
            FC.hideView(view);
        }
        else {
            FC.showView(view, moveToMouse);
        }
    };
    FC.moveViewToTopLayer = function (view) {
        DisplayTools.moveObjectToTopLayer(view.view);
    };
    Object.defineProperty(FC, "root", {
        get: function () {
            return FC._root;
        },
        set: function (value) {
            // Remove from the previous main container, if there was one
            if (FC.root) {
                FC.root.removeChild(FC.contentCont);
            }
            FC._root = value;
            // Add to the new main container, if there is one
            if (FC.root) {
                FC.root.addChild(FC.contentCont);
            }
        },
        enumerable: true,
        configurable: true
    });
    FC.password = "";
    FC.passwordInputIndex = 0;
    return FC;
}());
export { FC };
//# sourceMappingURL=FC.js.map