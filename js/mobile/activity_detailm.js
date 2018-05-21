$(function(){
    //自动滚动
    let boxheight=0;
    $(".rightbox").children().each(function(i,div){
        boxheight+=$(div).height();
    });
    let position=0;
    function autoscl(){
        position = position + 1;
        position = position % boxheight;
        $(".rightbox").scrollTop(position);
        setTimeout(autoscl,10);
    }

    //给框内图片加入自适应属性
    $("#contentpara").find("img").each(function(){
        $(this).addClass("img-responsive");
    });

    autoscl();
    $(".rightbox").scroll(function(){
        position=$(".rightbox").scrollTop();
    });

});