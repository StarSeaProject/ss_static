$(function(){
    //自动滚动
    let boxheight=0;
    $(".rightcont").children().each(function(i,div){
        boxheight+=$(div).height();
    });
    boxheight-=600;
    //在滚到末尾时停一下
    boxheight+=100;
    let position=0;
    function autoscl(){
        position = position + 1;
        position = position % boxheight;
        $(".rightcont").scrollTop(position);
        setTimeout(autoscl,10);
    }

    //给框内图片加入自适应属性
    $("#contentpara").find("img").each(function(){
        $(this).addClass("img-responsive");
    });

    let righth=$(".rightcont").height();
    let lefth=$(".leftcont").height();

    console.log(lefth);
    if (lefth>=600){
        $(".leftcont").css("overflow-y","scroll");
    }
    if(righth>=600){
        console.log(righth);
        $(".rightcont").css("overflow-y","scroll");
        autoscl();
        $(".rightcont").scroll(function(){
            position=$(".rightcont").scrollTop();
        });
    }

});