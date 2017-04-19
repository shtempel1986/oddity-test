/**
 * Created by Павел on 07.04.2017.
 */
function scrollLinks($sliderLink, height, side) {
    $(`.${side}-slide`).on("mousewheel", (e) => {
        if (e.deltaY === 1 && $sliderLink.eq($sliderLink.length - 1).data("itemPos") < 4) {
            $sliderLink.each((id, obj) => {
                let pos = $(obj).data("itemPos");
                pos++;
                $(obj).data("itemPos", pos);
            });
        }
        if (e.deltaY === -1 && $sliderLink.eq(0).data("itemPos") > -4) {
            $sliderLink.each((id, obj) => {
                let pos = $(obj).data("itemPos");
                pos--;
                $(obj).data("itemPos", pos)
            });
        }
        $sliderLink.each((id, obj) => {
            $(obj).fadeTo(0, 0.9 ** ($(obj).data("itemPos") * 3));
            $(obj).css({
                position: "absolute"
            }).animate({
                top: $(obj).data("itemPos") * height
            }, 100);
            // $(obj).children("img").height(height).width("auto");
        });
    })
}
$(document).ready(() => {
    let $sliderImg = $(".slider-link img"), $sliderLinkLeft = $(".slider-link_left"), $sliderLink = $(".slider-link"),
        height = $sliderImg.height(), $sliderLinkRight = $(".slider-link_right");
    $sliderLink.outerHeight($sliderImg.height());
    $(window).resize(() => {
        $sliderLink.outerHeight($sliderImg.height());
        height = $sliderImg.height();
    });
    $sliderLinkLeft.each((id, obj) => {
        $(obj).data("itemPos", id);
        $(obj).fadeTo(0, 0.9 ** (id * 3));
    })
        .hover(function () {
            $(this).fadeTo(0, 1)
        })
        .mouseleave(function () {
            $(this).fadeTo(0, 0.9 ** ($(this).data("itemPos") * 3))
        });
    $sliderLinkRight.each((id, obj) => {
        $(obj).data("itemPos", id);
        $(obj).fadeTo(0, 0.9 ** (id * 3));
    })
        .hover(function () {
            $(this).fadeTo(0, 1)
        })
        .mouseleave(function () {
            $(this).fadeTo(0, 0.9 ** ($(this).data("itemPos") * 3))
        });
    scrollLinks($sliderLinkLeft, height, "left");
    scrollLinks($sliderLinkRight, height, "right")
});