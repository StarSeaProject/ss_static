$(function () {
    $("#modifyAddressBtn").on("click",function(e){  
        areanum = $("#area").val(); 
        if(areanum==""||areanum==undefined){
        	alert("收货地址不合法！");
        	return false;
        }
        $("#areasub").val(areanum);
        adddetail = $("#ordadddel").val();
        if(adddetail.length==0){
        	alert("收货详细地址不能为空！");
        	return false;
        }
        if(adddetail.length>=50){
        	alert("收货地址过长！");
        	return false;
        }
        $("#modifyAddressForm").submit(); 
    });
});