function messagealert(s){
    $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
}
let psdunchanged=1;
let acunchanged=1;
$("#PasswordInput").on("click",function(){
    if (psdunchanged==1){
        $("#PasswordInput").attr("value","");
        $("#PasswordInput").css("color","black");
        $("#PasswordInput").attr("type","password");
        psdunchanged=0;
    }
});

$("#AccountInput").on("click",function(){
    if (acunchanged==1) {
        $("#AccountInput").attr("value","");
        $("#AccountInput").css("color", "black");
        acunchanged=0;
    }
});

$("#login").on("click",function(){
    if ($("#AccountInput").val() == "电子邮箱" ||$("#AccountInput").val()==""){
        messagealert("请输入账号");}

    else if ($("#PasswordInput").val() == "密码" ||$("#PasswordInput").val()==""){
        messagealert("请输入密码");}

    else {
        $("#PasswordInput").val(sha256($("#PasswordInput").val()));
        let data={userEmail:$("#AccountInput").val(),
            password:$("#PasswordInput").val()};
        $.post("/user/login",data, function(result){
            if(result.resultCode==1){
                $("#PasswordInput").val("");
                messagealert(result.result);
            }
            else{
                $("#jumpform").submit();
            }
        });

    }

});