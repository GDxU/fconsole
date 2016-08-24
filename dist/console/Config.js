"use strict";
var Config = (function () {
    function Config() {
        this.btnSettings = {
            labelSize: 14,
            labelColor: 0xFF9900
        };
        this.viewSettings = {
            bgColor: 0x000000,
            bgAlpha: 0.75,
            borderWidth: 1,
            borderColor: 0x660000,
            borderAlpha: 0.75,
            titleLabelColor: 0x00FF00,
            titleLabelSize: 14
        };
        this.displayListSettings = {
            hierarchyLabelColor: 0xFF0000,
            hierarchyLabelSize: 14
        };
    }
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map