

function roll_slide(scrollid, wait_time, slide_time) {//首页滚动效果
    var id = "#" + scrollid, scont = id + " .contIn", snav = id + " > .slideNavOut > .slide_nav > li", chd = scont + " > a", len = $(chd).length , wScont = 0, flag = 0, startx = 0, endx = 0, autoroll;
    var stime = slide_time > 0 ? slide_time : 340, wtim = wait_time > 0 ? wait_time : 5000;
    for (var i = len - 1; i >= 0; i--) {
        wScont += $(chd).eq(i).outerWidth(true);
        $(chd).eq(i).addClass("r_" + i);
    }
    $(scont).width(wScont);
    function autoslide() {
        autoroll = setInterval(function () {
            var mlong = $(chd).eq(0).outerWidth(true), sindex = $(snav).index($(id + " > .slideNavOut > .slide_nav > li.cur")), nindex = sindex + 1;
            if (sindex == len - 1) {
                nindex = 0;
            }
            $(scont).animate({marginLeft:"-=" + mlong}, stime, function () {
                $(chd).eq(0).appendTo($(scont)).parent().css("marginLeft", 0);
                $(snav).eq(nindex).addClass("cur").siblings().removeClass("cur");
            });
        }, wtim);
    }

    autoslide();
    $(chd).bind("vmouseup", function () {
        autoslide();
    });
    $(chd).bind("vmouseover", function () {
        clearInterval(autoroll);
    });

    function indexSlideToLeft() {
        var mlong = $(chd).first().outerWidth(true), sindex = $(snav).index($(id + " > .slideNavOut > .slide_nav > li.cur")), nindex = sindex + 1;
        if (sindex == len - 1) {
            nindex = 0;
        }
        $(snav).eq(nindex).addClass("cur").siblings().removeClass("cur");
        $(scont).animate({marginLeft:"-=" + mlong}, stime, function () {
            $(chd).eq(0).appendTo($(scont)).parent().css("marginLeft", 0);
        });
    }

    function indexSlideToRight() {
        var mlong = $(chd).last().outerWidth(true), sindex = $(snav).index($(id + " > .slideNavOut > .slide_nav > li.cur")), nindex = sindex - 1;
        if (sindex == 0) {
            nindex = len - 1;
        }
        $(snav).eq(nindex).addClass("cur").siblings().removeClass("cur");
        $(chd).last().prependTo($(scont)).parent().css("marginLeft", "-" + mlong + "px");
        $(scont).animate({marginLeft:0}, stime);
    }

    $(chd).bind("swipeleft", function () {//绑定滑动手势
        indexSlideToLeft();
    });
    $(chd).bind("swiperight", function () {//绑定滑动手势
        indexSlideToRight();
    });
    $(".nextSlider").bind("click", function () {//绑定点击手势
        indexSlideToLeft();
    });
    $(".preSlider").bind("click", function () {//绑定点击手势
        indexSlideToRight();
    });
}


