"use strict";

/**
 * Created by Павел on 07.04.2017.
 */
var height = 0;
function scrollLinks($sliderLink, side) {
    $("." + side + "-slide").on("mousewheel", function (e) {
        if (e.deltaY === 1 && $sliderLink.eq($sliderLink.length - 1).data("itemPos") < 4) {
            $sliderLink.each(function (id, obj) {
                var pos = $(obj).data("itemPos");
                pos++;
                $(obj).data("itemPos", pos);
            });
        }
        if (e.deltaY === -1 && $sliderLink.eq(0).data("itemPos") > -4) {
            $sliderLink.each(function (id, obj) {
                var pos = $(obj).data("itemPos");
                pos--;
                $(obj).data("itemPos", pos);
            });
        }
        $sliderLink.each(function (id, obj) {
            $(obj).fadeTo(0, Math.pow(0.9, $(obj).data("itemPos") * 3));
            $(obj).css({
                position: "absolute"
            }).animate({
                top: $(obj).data("itemPos") * height
            }, 100);
            // $(obj).children("img").height(height).width("auto");
        });
    });
}
$(document).ready(function () {
    var $sliderImg = $(".slider-link img"),
        $sliderLinkLeft = $(".slider-link_left"),
        $sliderLink = $(".slider-link"),
        $sliderLinkRight = $(".slider-link_right");
    height = $sliderImg.height();
    $sliderLink.outerHeight($sliderImg.height());
    $(window).resize(function () {
        $sliderLink.outerHeight($sliderImg.height());
        height = $sliderImg.height();
        $sliderLink.each(function (id, obj) {
            $(obj).css({
                position: "absolute",
                top: $(obj).data("itemPos") * height
            });
        });
    });
    $sliderLinkLeft.each(function (id, obj) {
        $(obj).data("itemPos", id);
        $(obj).fadeTo(0, Math.pow(0.9, id * 3));
    }).hover(function () {
        $(this).fadeTo(0, 1);
    }).mouseleave(function () {
        $(this).fadeTo(0, Math.pow(0.9, $(this).data("itemPos") * 3));
    });
    $sliderLinkRight.each(function (id, obj) {
        $(obj).data("itemPos", id);
        $(obj).fadeTo(0, Math.pow(0.9, id * 3));
    }).hover(function () {
        $(this).fadeTo(0, 1);
    }).mouseleave(function () {
        $(this).fadeTo(0, Math.pow(0.9, $(this).data("itemPos") * 3));
    });
    scrollLinks($sliderLinkLeft, "left");
    scrollLinks($sliderLinkRight, "right");
    //    Для мобильных устройств

    $(window).keydown(function (e) {

        if (e.which === 37) {
            $(window).trigger("swipeleft");
            e.preventDefault();
        }
        if (e.which === 39) {
            $(window).trigger("swiperight");
            e.preventDefault();
        }
    });
    $(window).on("swipeleft", function () {
        if ($(".right-slider_show_xs").length === 0) $(".left-slider").addClass("left-slider_show_xs");else $(".right-slider_show_xs").removeClass("right-slider_show_xs");
        height = $sliderLinkLeft.children("img").height();
        $sliderLink.outerHeight(height);
        $sliderLink.each(function (id, obj) {
            $(obj).css({
                position: "absolute",
                top: $(obj).data("itemPos") * height
            });
        });
    });
    $(window).on("swiperight", function () {
        if ($(".left-slider_show_xs").length === 0) $(".right-slider").addClass("right-slider_show_xs");else $(".left-slider_show_xs").removeClass("left-slider_show_xs");
        height = $sliderLinkRight.children("img").height();
        $sliderLink.outerHeight(height);
        $sliderLink.each(function (id, obj) {
            $(obj).css({
                position: "absolute",
                top: $(obj).data("itemPos") * height
            });
        });
    });
});