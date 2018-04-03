$(function(){
    function pageresponse(){
        let width1=$(window).width();
        let height1=$(window).height();

        $(".main").css("height",height1*0.75);
        $(".mymain").css("height",height1*1.5);
        $(".footbar").css("height",height1*0.05);
        $(".con1").css("height",height1*0.25);
        $(".con2").css("height",height1*0.2);
        $(".con3").css("height",height1*0.5);
        $(".con4").css("height",height1*0.3);

    }
    pageresponse();
    $(window).resize(function(){
        pageresponse();
    });
});
