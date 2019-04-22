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
    //金额输入

    function messagealert(s){
        $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
    }

    $(".checkbutton").on("click",function(){
        if(/^\d+\.?\d{0,2}$/.test($("input").val())){
            $("#form1").submit();
        }else{
            messagealert("请输入有效格式的数字");
        }
    });

});