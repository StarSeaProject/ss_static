$(function(){
    function shopp(){
        y = $(window).height();
        cury = $(document).height();
            //$(window).scrollTop()+y-100;
        $('#cardiv').css("margin-left","75%").css("margin-top",y-cury+"px");
    }
    shopp();
    $(window).scroll(function () {
        shopp();
        });
});

