$(function(){
    function navresponse(){
        let width1=$(window).width();
        let height1=width1/4;
        $(".common-navbar").css("height",height1);
        $(".heading").css("height",height1);
    }
    navresponse();
    $(window).resize(function(){
            navresponse();
    });
});