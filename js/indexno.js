$(function(){
    function pageresponse(){
        let width1=$(window).width();
        let height1=$(window).height();

        $(".main").css("height",height1*0.75);
        $(".con1").css("height",height1*0.25);
        $(".con2").css("height",height1*0.2);

    }
    pageresponse();
    let heighta=$("#ConnectedSite").height();
    $(".bgimg").css("height",heighta);

    $("#ShowSite").on("click",function(){
        $("#ConnectedSite").slideToggle();
    });

    $(window).on("resize",function(){
        pageresponse();
    });


});
