$(function () {
    $("#addOrderBtn").on("click",function(e){
        name = $("#ordname").val();
        if(name.length==0){
        	alert("收货人为空");
        	return false;
        }
        if(name.length>=10){
        	alert("收货姓名过长");
    		return false;
    	}
        
        phone = $("#ordphone").val();
        if(phone.length!=11){
        	alert("手机号格式错误！");
        	return false;
        }
        
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
        
        email = $("#ordemail").val();
        if(email.length == 0){
        	alert("电子邮箱为空");
        	return false;
        }
        var reg = /\w+[@]{1}\w+[.]\w+/;
        if(!reg.test(email)){
        	alert("Email格式不对");
        	return false;
        }
        
        $("#addOrderForm").submit(); 
    });
    
    let provinces = [[${provinces}]];
    let citys;
    $("#province").on("change",function(e){
    	let provinceId=$(e.target).val();
    	citys=provinces[provinceId].citys;
    	let str=``;
    	for(let city in citys){
    		str+=`<option value='${citys[city].cityId}'>${citys[city].cityName}</option>`;
    	}
    	$("#area").html("").attr("disabled","disabled");
    	$("#city").html(str);
    	if($("#city").attr("disabled")=="disabled"){
    		$("#city").removeAttr("disabled");
    	}
    });
    $("#city").on("change",function(e){
    	let cityId=$(e.target).val();
    	let areas=citys[cityId].areas;
    	let str=``;
    	for(let area in areas){
    		str+=`<option value='${areas[area].areaId}'>${areas[area].areaName}</option>`;
    	}
    	$("#area").html(str);
    	if($("#area").attr("disabled")=="disabled"){
    		$("#area").removeAttr("disabled");
    	}
    });
});