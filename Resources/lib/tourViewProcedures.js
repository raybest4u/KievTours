function makeTourView(tour) {
    var tourView = Alloy.createController("tourView");
    tourView.setStyles(bigImageStyle, smallImageStyle);
    tourView.setTour(tour);
    tourView.getView("bigPicture").applyProperties(bigImageStyle);
    smallImageStyle.image = tour.img;
    tourView.getView("smallPicture").applyProperties(smallImageStyle);
    tourView.getView("background").applyProperties({
        image: tour.background
    });
    tourView.getView("title").text = tour.title;
    textWidth = tourView.getView("title").toImage().width;
    textWidth > .7 * bigImgSize && (textWidth = .7 * bigImgSize);
    tourView.getView("title").applyProperties({
        top: bigImgSize / 6,
        width: textWidth
    });
    tourView.getView("text").text = tour.text;
    textWidth = tourView.getView("text").toImage().width;
    textWidth > .8 * bigImgSize && (textWidth = .8 * bigImgSize);
    tourView.getView("text").applyProperties({
        top: bigImgSize / 6 + 10 + tourView.getView("title").toImage().height,
        width: textWidth
    });
    tourView.getView("icons").applyProperties({
        top: 4 * bigImgSize / 6,
        left: bigImgSize / 2 - 90
    });
    tourView.getView("sizeMb").text = tour.size;
    tourView.getView("dotAmount").text = tour.dots.length;
    tourView.getView("time").text = tour.time;
    tourView.getView("price").text = 0 === tour.price ? "FREE" : "$" + tour.price;
    var buttonView = tourView.getView("button");
    buttonView.currentTour = tour;
    if (tour.isBuyed) if (tour.isDownloaded) {
        buttonImgPath = "images/tourView/Play_Button.png";
        tourView.setListenerFlag(2);
    } else {
        buttonImgPath = "images/tourView/Download_Button.png";
        tourView.setListenerFlag(1);
    } else {
        buttonImgPath = "images/tourView/Buy_Button.png";
        tourView.setListenerFlag(0);
    }
    buttonView.applyProperties({
        left: bigImgSize / 2 - 46,
        image: buttonImgPath
    });
    return tourView.getView();
}

var platformWidth = Titanium.Platform.displayCaps.platformWidth;

var bigImgSize = .9 * platformWidth;

var leftOffset = .05 * platformWidth;

var topOffset = (Titanium.Platform.displayCaps.platformHeight - bigImgSize) / 2;

var textWidth, buttonImgPath;

var smallImgSize = bigImgSize / 3;

var controller;

var listenerBuf;

var oldIndex = 0;

var tours = Alloy.Globals.getTours();

var bigImageStyle = {
    width: bigImgSize,
    height: bigImgSize,
    left: leftOffset,
    top: topOffset,
    zIndex: 3
};

var smallImageStyle = {
    width: smallImgSize,
    height: smallImgSize,
    left: platformWidth - (leftOffset + smallImgSize),
    top: topOffset - smallImgSize / 2,
    zIndex: 5
};

exports.initTourViews = function(index) {
    controller = index;
    var toursLength = tours.length, pagingArray = [];
    var paging = controller.getView("paging"), scrollView = Ti.UI.createScrollableView();
    for (var i = 0; toursLength > i; i++) {
        pagingArray.push(Ti.UI.createImageView({
            width: 5,
            height: 5,
            left: 10 * i,
            image: "images/Radio_bullets_off.png"
        }));
        paging.add(pagingArray[i]);
    }
    paging.applyProperties({
        bottom: 50,
        height: 5,
        width: 10 * pagingArray.length,
        zIndex: 4
    });
    pagingArray[0].applyProperties({
        image: "images/Radio_bullets_on.png"
    });
    scrollView.addEventListener("scrollend", function() {
        var newIndex = scrollView.getCurrentPage();
        if (oldIndex !== newIndex) {
            var children = scrollView.getViews();
            if (newIndex > oldIndex) {
                newIndex == children.length - 1 && tours.length > newIndex + 1 && scrollView.addView(makeTourView(tours[newIndex + 1]));
                pagingArray[oldIndex].applyProperties({
                    image: "images/Radio_bullets_off.png"
                });
                pagingArray[newIndex].applyProperties({
                    image: "images/Radio_bullets_on.png"
                });
                oldIndex = newIndex;
            } else {
                if (newIndex >= 0) {
                    pagingArray[oldIndex].applyProperties({
                        image: "images/Radio_bullets_off.png"
                    });
                    pagingArray[newIndex].applyProperties({
                        image: "images/Radio_bullets_on.png"
                    });
                }
                oldIndex = newIndex;
            }
        }
    });
    scrollView.addView(makeTourView(tours[0]));
    scrollView.addView(makeTourView(tours[1]));
    controller.getView("window").add(scrollView);
    var menu = Alloy.createController("menuView");
    controller.getView("window").add(menu.getView("menuListener"));
    controller.getView("window").add(menu.getView("menu"));
    controller.getView().open();
};

exports.getBigImageStyle = function() {
    return bigImageStyle;
};

exports.getSmallImageStyle = function() {
    return smallImageStyle;
};