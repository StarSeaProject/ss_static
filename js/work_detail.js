$(window).scroll(function () {
    y = $(window).height();
    cury = $(window).scrollTop()+y-160;
    $('#cardiv').css("left","90%").css("top",cury+"px");
});