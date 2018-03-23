$(function(){
    function navresponse(){
        let width1=$(window).width();
        let height1=width1/5;
        $(".heading").css("height",height1);
    }
    navresponse();
    $(window).resize(navresponse());
});