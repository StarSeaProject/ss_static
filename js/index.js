$(function() {
    windowwidth=$(window).width();
    console.log(windowwidth);
    if(windowwidth<1920){$(window).scrollLeft((1920-windowwidth)/2);}

});