function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        zIndex: 0,
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.logo = Ti.UI.createImageView({
        zIndex: 1,
        image: "images/APP_Kiev_logo.png",
        width: 50,
        heigth: 50,
        top: 15,
        left: 15,
        id: "logo"
    });
    $.__views.window.add($.__views.logo);
    var __alloyId0 = [];
    $.__views.scrollView = Ti.UI.createScrollableView({
        views: __alloyId0,
        id: "scrollView"
    });
    $.__views.window.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tour = Ti.require("lib/tourViewModel");
    tour.showTours();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;