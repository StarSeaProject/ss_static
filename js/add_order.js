let IdList=[-1,-1,-1];
let ClassId=0;


$(function () {
    $("#expensebar").hide();


    class Button extends Object{
        constructor(tag){
            super();
            this.tag=tag;
        }
    }

    class PayOnlineButton{
        constructor(tagfalse,tagtrue,row,input){
            this.tagfalse=tagfalse;
            this.tagtrue=tagtrue;
            this.value=false;
            this.isShow=true;
            this.row=row;
            this.input=input;
            this.input.val(false);
            this.PayOnlineBtClass(this.tagfalse);
        }

        PayOnlineBtClass(tag){
            tag.toggleClass("PayOnlineUv");
            tag.toggleClass("PayOnlineVd");
        }

        SetTrue(){
            if(!this.value){
                this.PayOnlineBtClass(this.tagfalse);
                this.PayOnlineBtClass(this.tagtrue);
                this.input.val(true);
                this.value=true;
            }
        }

        SetFalse(){
            if(this.value){
                this.PayOnlineBtClass(this.tagfalse);
                this.PayOnlineBtClass(this.tagtrue);
                this.input.val(false);
                this.value=false;
            }
        }

        SetShow(){
            if(!this.isShow){
                this.row.show();
                this.isShow=true;
            }
        }

        SetHide(){
            if(this.isShow){
                this.row.hide();
                this.SetFalse();
                this.isShow=false;
            }
        }

        HandleClick(id){
            if(id==0){
                if(this.value){
                    this.SetFalse();
                }
            }
            if(id==1){
                if(!this.value){
                    this.SetTrue();
                }
            }

        }
    }

    class NavButton extends Button{

        NavBtClass(){
            this.tag.toggleClass("navnormal");
            this.tag.toggleClass("navvisited");
        }

        HandelClick(){
            $(".addressmap [data-id="+ClassId+"]").hide();
            ClassId=Number(this.tag.attr("name"));
            console.log(ClassId);
            $(".addressmap [data-id="+ClassId+"]").show();
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
        constructor(tag,pobt){
            super(tag);
            this.pobt=pobt;
        }

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

            if(IdList[0]>31){
                this.pobt.SetHide();
            }
            else{
                this.pobt.SetShow();
            }

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

            $(document).trigger("click");
        }
    }

    console.log(provinces[33]);
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
					<div class="col-xs-3" >
						<a class="addressbutton addressnormal" data-class="${ClassId}" name="${DataList[DataItem].Id}">
								${DataList[DataItem].Name}
						</a>
					</div>
					`
            str += tableformat(stra, i);
            i += 1;
        }
        if (i % 4 === 0) {
            str += `</div>`;
        }
        $(".addressmap [data-id="+ClassId+"]").html(str);
    }


    function tableformat(str, i) {
        let strout = "";
        if (i % 4 === 0) {
            strout += `<div class="row">`;
        }

        strout += str;

        if (i % 4 === 3) {
            strout += `</div>`;
        }
        return (strout);
    }

    let navpre = undefined;
    let classlength=3;
    WriteMap(0);
    $(".addressmap").hide();

    let PayOnline=new PayOnlineButton($(".PayOnlineBt[data-id=0]"),$(".PayOnlineBt[data-id=1]"),$(".isPayOnlineRow"),$("#isPayOnline"));

    $(".navbutton").on("click", function () {

        let buttonobj=new NavButton($(this));
        buttonobj.HandelClick();
        buttonobj=null;
    });

    $(".PayOnlineBt").on("click",function(e){
        PayOnline.HandleClick($(e.target).attr('data-id'));
    });

    $(".addressmap").on("click", ".addressbutton", function (e) {

        let buttonobj;
        switch(ClassId){
            case 0:
                buttonobj=new ProvinceButton($(e.target),PayOnline);
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

        $(".addressmap").show();

        e.stopPropagation();
        //点击其他地方关闭窗口
        $(document).on("click", function () {
            $(".addressmap").hide();
            return 0;
        });

        $("#provincenav").trigger("click");


    });

    $(".addressmap").on("click", function (e) {
        e.stopPropagation();
    });

    $("#addOrderBtn").on("click", function (e) {
        name = $("#ordname").val();
        if (name.length === 0) {
            alert("收货人为空");
            return false;
        }
        if (name.length >= 10) {
            alert("收货姓名过长");
            return false;
        }

        phone = $("#ordphone").val();
        if (phone.length !== 11) {
            alert("手机号格式错误！");
            return false;
        }

        areanum = $("#areasub").val();
        if (areanum === "" || areanum === undefined) {
            alert("收货地址不合法！");
            return false;
        }

        adddetail = $("#ordadddel").val();
        if (adddetail.length === 0) {
            alert("收货详细地址不能为空！");
            return false;
        }
        if (adddetail.length >= 50) {
            alert("收货地址过长！");
            return false;
        }

        email = $("#ordemail").val();
        if (email.length === 0) {
            alert("电子邮箱为空");
            return false;
        }
        var reg = /\w+[@]{1}\w+[.]\w+/;
        if (!reg.test(email)) {
            alert("Email格式不对");
            return false;
        }

        let remark = $("#orderRemark").val();
        if (remark.length > 50) {
            alert("备注长度不能超过50");
            return false;
        }

        $("#addOrderForm").submit();
    });

});
