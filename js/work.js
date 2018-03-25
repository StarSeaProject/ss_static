$(function () {

    $(window).scroll(function () {
        y = $(window).height();
        cury = $(window).scrollTop()+y-160;
        $('#cardiv').css("left","90%").css("top",cury+"px");
    });

//隐藏锚点按钮
    $("#anchorbutton").hide();
    $(window).scroll(function () {
        let scrollTop = $(this).scrollTop();
        if (scrollTop>=500){
            $("#anchorbutton").show();
        }
        if (scrollTop<=500){
            $("#anchorbutton").hide();
        }
    })
    $("#anchorbutton").click(function(){
        $(this).hide();
    });
});


