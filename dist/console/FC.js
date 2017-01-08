"use strict";
var fgraphics_1 = require("fgraphics");
var ConsoleView_1 = require("./view/ConsoleView");
var DisplayListView_1 = require("./view/DisplayListView");
var index_1 = require("fcore/dist/index");
var index_2 = require("flibs/dist/index");
var Config_1 = require("./Config");
var TooltipManager_1 = require("../tooltip/TooltipManager");
var ConsoleTooltip_1 = require("./view/tooltip/ConsoleTooltip");
var FC = (function () {
    function FC() {
    }
    FC.startInit = function (root, password, config) {
        if (password === void 0) { password = "`"; }
        index_1.Logger.log("CC: ", FC);
        FC.contentCont = fgraphics_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        FC.viewsCont = fgraphics_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        FC.contentCont.addChild(FC.viewsCont);
        FC.tooltipsCont = fgraphics_1.EngineAdapter.instance.createDisplayObjectContainerWrapper();
        FC.contentCont.addChild(FC.tooltipsCont);
        FC.password = password;
        if (!config) {
            config = new Config_1.Config();
        }
        FC.config = config;
        var tempTooltip = new ConsoleTooltip_1.ConsoleTooltip();
        FC.tooltipManager = new TooltipManager_1.TooltipManager(tempTooltip);
        FC.tooltipManager.tooltipCont = FC.tooltipsCont;
        FC.tooltipManager.mouseShift = new index_1.Point(10, 15);
        // View
        FC.view = new ConsoleView_1.ConsoleView();
        FC.displayListView = new DisplayListView_1.DisplayListView();
        // Events
        FC.eventListenerHelper.addEventListener(index_2.InputManager.instance, index_2.InputManagerEvent.KEY_PRESS, function (data) {
            var charCode = index_1.KeyboardTools.getCharCodeFromKeyPressEvent(data.nativeEvent);
            if (charCode === FC.password.charCodeAt(FC.passwordInputIndex)) {
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
        FC.eventListenerHelper.addEventListener(fgraphics_1.EngineAdapter.instance.mainTicker, fgraphics_1.TickerEvent.TICK, function () {
            if (FC.config.console.aboveAll) {
                fgraphics_1.DisplayObjectTools.moveObjectToTopLayer(FC.contentCont);
            }
        });
        FC.root = root;
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
                fgraphics_1.DisplayObjectTools.moveObjectToTopLayer(FC.viewsCont);
                fgraphics_1.DisplayObjectTools.moveObjectToTopLayer(FC.tooltipsCont);
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
            var localPos = view.view.parent.toLocal(new index_1.Point(fgraphics_1.EngineAdapter.instance.globalMouseX + 1, fgraphics_1.EngineAdapter.instance.globalMouseY + 1));
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
        fgraphics_1.DisplayObjectTools.moveObjectToTopLayer(view.view);
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
    return FC;
}());
FC.eventListenerHelper = new index_1.EventListenerHelper();
FC.password = "";
FC.passwordInputIndex = 0;
exports.FC = FC;
//# sourceMappingURL=FC.js.map