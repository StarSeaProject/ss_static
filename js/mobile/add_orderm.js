$(function () {
    let navpre=$("#provincenav");
    let provincepre;
    let citypre;
    let areapre;
    WriteProvince();



    $("#provincenav").toggleClass("navbutton");
    $("#provincenav").toggleClass("navvisited");
    $("#addressbutton").on("click",function(){
        $("#Modalbox").modal();
        let heightap=$(".modal-dialog").height()-$(".modal-header").height()-$("#addressnav").height()-20;
        $(".addresspanel").css("height",heightap);
        navpre.trigger("click");

        $("#provincenav").on("click",function(){
            $("#city").hide();
            $("#area").hide();
            $("#province").show();
            navpre.toggleClass("navbutton");
            navpre.toggleClass("navvisited");
            navpre=$(this);
            navpre.toggleClass("navbutton");
            navpre.toggleClass("navvisited");
        });

        $("#citynav").on("click",function(){
            $("#area").hide();
            $("#province").hide();
            $("#city").show();
            navpre.toggleClass("navbutton");
            navpre.toggleClass("navvisited");
            navpre=$(this);
            navpre.toggleClass("navbutton");
            navpre.toggleClass("navvisited");
        });

        $("#areanav").on("click",function(){
            $("#city").hide();
            $("#province").hide();
            $("#area").show();
            navpre.toggleClass("navbutton");
            navpre.toggleClass("navvisited");
            navpre=$(this);
            navpre.toggleClass("navbutton");
            navpre.toggleClass("navvisited");
        });

        $("#province").on("click",".provincebutton",function(e){
            let provinceId=$(e.target).attr("value");
            WriteCity(provinceId);
            $("#area").html("");
            $("#areasub").val("");
            if (provincepre!==undefined){
                provincepre.toggleClass("addressbutton");
                provincepre.toggleClass("addressvisited");
            }
            provincepre=$(this);
            provincepre.toggleClass("addressbutton");
            provincepre.toggleClass("addressvisited");
            $("#addressbutton").text(provincepre.text());
        });

        $("#city").on("click",".citybutton",function(e){
            let cityId=$(e.target).attr("value");
            WriteArea(cityId);
            $("#areasub").val("");
            if (citypre!==undefined){
                citypre.toggleClass("addressbutton");
                citypre.toggleClass("addressvisited");
            }
            citypre=$(this);
            citypre.toggleClass("addressbutton");
            citypre.toggleClass("addressvisited");
            $("#addressbutton").text(provincepre.text()+citypre.text());
        });

        $("#area").on("click",".areabutton",function(e){
            areanum = $(e.target).attr("value");
            $("#areasub").val(areanum);
            if (areapre!==undefined){
                areapre.toggleClass("addressbutton");
                areapre.toggleClass("addressvisited");
            }
            areapre=$(this);
            areapre.toggleClass("addressbutton");
            areapre.toggleClass("addressvisited");
            $("#addressbutton").text(provincepre.text()+citypre.text()+areapre.text());
        });
    });




    $("#addOrderBtn").on("click",function(e){
        name = $("#ordname").val();
        if(name.length===0){
            alert("收货人为空");
            return false;
        }
        if(name.length>=10){
            alert("收货姓名过长");
            return false;
        }

        phone = $("#ordphone").val();
        if(phone.length!==11){
            alert("手机号格式错误！");
            return false;
        }

        areanum = $("#areasub").val();
        if(areanum===""||areanum===undefined){
            alert("收货地址不合法！");
            return false;
        }

        adddetail = $("#ordadddel").val();
        if(adddetail.length===0){
            alert("收货详细地址不能为空！");
            return false;
        }
        if(adddetail.length>=50){
            alert("收货地址过长！");
            return false;
        }

        email = $("#ordemail").val();
        if(email.length === 0){
            alert("电子邮箱为空");
            return false;
        }
        var reg = /\w+[@]{1}\w+[.]\w+/;
        if(!reg.test(email)){
            alert("Email格式不对");
            return false;
        }

        let remark=$("#orderRemark").val();
        if(remark.length>50){
            alert("备注长度不能超过50");
            return false;
        }
        $("#addOrderForm").submit();
    });

});