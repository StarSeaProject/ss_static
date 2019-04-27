$(function(){
    //自动滚动
    let boxheight=0;
    $("#rightbox").children().each(function(i,div){
        boxheight+=$(div).height()+10;
    });
    //在滚到末尾时停一下
    boxheight+=100;
    let position=0;
    function autoscl(){
        position = position + 1;
        if (position>boxheight){
            position = position - boxheight;
        }

        $(".rightcont").scrollTop(position);
        setTimeout(autoscl,10);
    }

    //给框内图片加入自适应属性
    $("#contentpara").find("img").each(function(){
        $(this).addClass("img-responsive");
    });

    let righth=$("#namebox").height();
    let lefth=$(".leftcont").height();

    if (lefth>=860){
        $(".leftcont").css("overflow-y","scroll");
    }
    if(righth>=600){
        $("#namebox").css("overflow-y","scroll");
        autoscl();
        $("#namebox").scroll(function(){
            position=$("#namebox").scrollTop();
        });
    }

    //众筹名单的颜色
    $(".newbox").each(function(i,div){
        let randn=Math.floor(Math.random()*9);
        let colstr='';
        switch(randn){
            case 0:
                colstr='#f08300';
                break;
            case 1:
                colstr='#ff9999';
                break;
            case 2:
                colstr='#229977';
                break;
            case 3:
                colstr='#ff4a4a';
                break;
            case 4:
                colstr='#44aaff';
                break;
            case 5:
                colstr='#7a7a7a';
                break;
            case 6:
                colstr='#dbb623';
                break;
            case 7:
                colstr='#d47aff';
                break;
            case 8:
                colstr='#ff5599';
                break;
            default:
        }
        $(this).css("color",colstr);
    });
    //金额输入

    function messagealert(s){
        $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
    }

    $(".checkbutton").on("click",function(){
        if(/^\d+\.?\d{0,2}$/.test($("#MoneyInput").val())){
            $("#fundingMoney").val(Number($("#MoneyInput").val()));
            $("[name='activityId']").val(parseInt($("[name='activityId']").val()));
            $("#form1").submit();
        }else{
            messagealert("请输入有效格式的数字");
        }
    });

});