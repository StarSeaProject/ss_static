function messagealert(s){
    $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
}
let psdunchanged=1;
let acunchanged=1;
let vcunchanged=1;
$("#PasswordInput").focus(function(){
    if (psdunchanged==1){
        $("#PasswordInput").attr("value","");
        $("#PasswordInput").css("color","black");
        $("#PasswordInput").attr("type","password");
        psdunchanged=0;
    }
});

$("#AccountInput").focus(function(){
    if (acunchanged==1) {
        $("#AccountInput").attr("value","");
        $("#AccountInput").css("color", "black");
        acunchanged=0;
    }
});

$("#vcodeInput").focus(function(){
    if (vcunchanged==1) {
        $("#vcodeInput").attr("value","");
        $("#vcodeInput").css("color", "black");
        vcunchanged=0;
    }
});

$("#login").on("click",function(){
    if ($("#AccountInput").val() == "电子邮箱" ||$("#AccountInput").val()==""){
        messagealert("请输入账号");}

    else if ($("#PasswordInput").val() == "密码" ||$("#PasswordInput").val()==""){
        messagealert("请输入密码");}

    else if ($("#vcodeInput").val()== "验证码" ||$("#vcodeInput").val()==""){
        messagealert("请输入验证码");
    }

    else {
        let data={userEmail:$("#AccountInput").val(),
            userPassword:sha256($("#PasswordInput").val()),
            verifyCode:$("#vcodeInput").val()};
        $.post("/user/login",data, function(result){
            if(result.resultCode==1){
                messagealert(result.result);
                $("#PasswordInput").val("");
                $("#vcodeInput").val("");
                $("[alt='验证码']").trigger("click");
            }
            else{
                $("#jumpform").submit();
            }
        });

    }

});