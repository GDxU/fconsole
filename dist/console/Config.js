"use strict";
var Config = (function () {
    function Config() {
        this.localization = {
            closeBtnTooltipTitle: "Close",
            displayListBtnTooltipTitle: "Display List Inspector",
            displayListBtnTooltipText: "Map the display list\nunder your mouse",
            captureKeyBtnTooltipTitle: "Assign a key",
            captureKeyBtnNormalLabel: "Capture key: {0}",
            captureKeyBtnPressedLabel: "Press a key",
            captureKeyBtnNoKeyHelpText: "(click to add)",
            displayListTitle: "Display List Inspector",
            displayListCapturedKeyText: "Press an assinged key\nto add display list hierarchy\nto the browser console",
            additionalInfoBtnNormalLabel: "Additional Info: off",
            additionalInfoBtnPressedLabel: "Additional Info: on",
            additionalInfoBtnTooltipTitle: "Additional visual objects info",
            additionalInfoBtnTooltipText: "Position, width, height, etc. (configurable)",
            moveHelperBtnNormalLabel: "Move Helper: off",
            moveHelperBtnPressedLabel: "Move Helper: on",
            moveHelperTooltipTitle: "Move Helper",
            moveHelperTooltipText: "Enable Move Helper and press CTRL\nfor choosing an object to move\nwith arrow keys (← ↑ → ↓)",
            movableObjectText: "(MOVABLE)",
        };
        this.btnSettings = {
            labelSize: 14,
            labelColor: 0xFF9900
        };
        this.viewSettings = {
            bgColor: 0x000000,
            bgAlpha: 0.75,
            bgToContentShift: { x: 10, y: 10 },
            borderWidth: 1,
            borderColor: 0x660000,
            borderAlpha: 0.75,
            titleLabelColor: 0xFFFFFF,
            titleLabelSize: 14
        };
        this.displayListSettings = {
            hierarchyLabelColor: 0xCCCCCC,
            hierarchyLabelSize: 14,
            additionalInfoParams: {
                "x": { toFixed: 2 },
                "y": { toFixed: 2 },
                "width": { visualName: "w", toFixed: 2 },
                "height": { visualName: "h", toFixed: 2 }
            }
        };
        this.tooltipSettings = {
            bgColor: 0x000000,
            bgAlpha: 0.75,
            bgToContentShift: { x: 10, y: 10 },
            borderWidth: 1,
            borderColor: 0x660000,
            borderAlpha: 0.75,
            titleLabelColor: 0xFF9900,
            titleLabelSize: 14,
            textLabelColor: 0xCCCCCC,
            textLabelSize: 12
        };
    }
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map