$(function(){
    //自动滚动
    let boxheight=0;
    $(".rightbox").children().each(function(i,div){
        boxheight+=$(div).height();
    });
    console.log(boxheight);
    let position=0;
    function autoscl(){
        position = position + 1;
        position = position % boxheight;
        $(".rightbox").scrollTop(position);
        setTimeout(autoscl,10);
    }

    let maxh=$(".leftbox").height();
    console.log(maxh);
    $(".rightbox").css("height",maxh);
    autoscl();
    $(".rightbox").scroll(function(){
        position=$(".rightbox").scrollTop();
    });

});