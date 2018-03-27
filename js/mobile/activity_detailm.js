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
    autoscl();
    $(".rightbox").scroll(function(){
        position=$(".rightbox").scrollTop();
    });

});