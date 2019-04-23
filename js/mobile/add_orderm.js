$(function () {
    let IdList=[-1,-1,-1];
    let ClassId=0;

    $("#expensebar").hide();

    function WriteMap(ClassId) {
        let i = 0;
        let str = '';
        let ItemList;
        let DataList=[];
        switch(ClassId){
            case 0:
                for (let Item in provinces){
                    DataList.push({Id:provinces[Item].provinceId,Name:provinces[Item].provinceName});
                }
                break;
            case 1:
                ItemList=provinces[IdList[0]].citys;
                for (let Item in ItemList){
                    DataList.push({Id:ItemList[Item].cityId,Name:ItemList[Item].cityName});
                }
                break;
            case 2:
                ItemList=provinces[IdList[0]].citys[IdList[1]].areas;
                console.log(ItemList);
                for (let Item in ItemList){
                    DataList.push({Id:ItemList[Item].areaId,Name:ItemList[Item].areaName});
                }
                break;
        }
        for (let DataItem in DataList) {
            let stra = `
					<div class="row">
						<div class="col-xs-12" >
							<a class="addressbutton  addressnormal" data-class="${ClassId}" name="${DataList[DataItem].Id}">
									${DataList[DataItem].Name}
							</a>
						</div>
					</div>
					`
            str += stra;
        }
        $(".addressmap [data-id="+ClassId+"]").html(str);
    }

    class Button extends Object{
        constructor(tag){
            super();
            this.tag=tag;
        }
    }

    class NavButton extends Button{

        NavBtClass(){
            this.tag.toggleClass("navnormal");
            this.tag.toggleClass("navvisited");
        }

        HandelClick(){
            $(".addresspanel[data-id="+ClassId+"]").hide();
            ClassId=Number(this.tag.attr("name"));
            console.log(ClassId);
            $(".addresspanel[data-id="+ClassId+"]").show();
            if(navpre!==undefined){
                let objectpre=new NavButton(navpre);
                objectpre.NavBtClass();
                objectpre=null;
            }
            navpre = this.tag;
            this.NavBtClass();
        }
    }

    class AddressButton extends Button {
        AddBtClass(){
            this.tag.toggleClass("addressnormal");
            this.tag.toggleClass("addressvisited");
        }

        HandlePre(){
            if (IdList[ClassId] !== -1) {
                let buttonpre=new AddressButton($("[data-class="+ClassId+"][name="+IdList[ClassId]+"]"));
                buttonpre.AddBtClass();
                buttonpre=null;
            }
            IdList[ClassId] = $(this.tag).attr("name");
        }

        HandlePost(){
            let buttonpost=new AddressButton($("[data-class="+ClassId+"][name="+IdList[ClassId]+"]"));
            buttonpost.AddBtClass();
            buttonpost=null;

            let buttontext='';

            for (let i=0;i<ClassId+1;i=i+1){
                buttontext=buttontext+$("[data-class="+i+"][name="+IdList[i]+"]").text();
            }

            $("#addressbutton").text(buttontext);
        }
    }

    class ProvinceButton extends AddressButton{
        HandleClick(){
            this.HandlePre();

            $("#city").hide();
            $("#area").hide();
            WriteMap(1);
            $("#area").html("");
            $("#areasub").val("");

            this.HandlePost();
            let data={provinceId:IdList[0]};
            $.get("/order/postage/money",data, function(result){
                console.log(result);
                $("#expense").text("预计邮费 至"+$("[data-class="+0+"][name="+IdList[0]+"]").text()+"：RMB"+result.postageMoney);
                $("#expensebar").show();
            });
            $(".navbutton[name=1]").trigger("click");
        }
    }
    class CityButton extends AddressButton{
        HandleClick(){
            this.HandlePre();

            WriteMap(2);
            $("#areasub").val("");

            this.HandlePost();

            $(".navbutton[name=2]").trigger("click");
        }
    }class AreaButton extends AddressButton{
        HandleClick(){
            this.HandlePre();

            $("#areasub").val(IdList[ClassId]);

            this.HandlePost();

            $("#Modalbox").modal('hide');
        }
    }

    let navpre = undefined;
    let classlength=3;
    WriteMap(0);


    $(".navbutton").on("click", function () {

        let buttonobj=new NavButton($(this));
        buttonobj.HandelClick();
        buttonobj=null;
        console.log(ClassId);
    });


    $(".addressmap").on("click", ".addressbutton", function (e) {

        let buttonobj;
        switch(ClassId){
            case 0:
                buttonobj=new ProvinceButton($(e.target));
                break;
            case 1:
                buttonobj=new CityButton($(e.target));
                break;
            case 2:
                buttonobj=new AreaButton($(e.target));
                break;
        }
        buttonobj.HandleClick();
        buttonobj=null;
    });

    $("#addressbutton").on("click", function (e) {


        $("#Modalbox").modal();
        let heightap=$(".modal-dialog").height()-$(".modal-header").height()-$("#addressnav").height()-20;
        $(".addresspanel").css("height",heightap);


        e.stopPropagation();

        $("#provincenav").trigger("click");


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