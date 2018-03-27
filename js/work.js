$(function () {

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


