$(function(){
    function navresponse(){
        let width1=$(window).width();
        $(".common-navbar").css("height",width1/6);
        $(".heading").css("height",width1/5);
    }
    navresponse();
    $(window).resize(function(){
            navresponse();
    });
});