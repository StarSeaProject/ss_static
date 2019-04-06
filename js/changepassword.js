function messagealert(s){
    $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
}

$("#submitbt1").click(function(){
    let password=$("#formprepassword").val();
    if(!password){
        messagealert("用户密码不能为空");
        return false;
    }

    let newpassword=$("#formnewpassword").val();
    if(!newpassword){
        messagealert("新密码不能为空");
        return false;
    }
    if(newpassword!=$("#formcheckpassword").val()){
        messagealert("新密码与确认密码不匹配");
        return false;
    }


    $("#currentPassword").val(sha256(password));
    $("#newPassword").val(sha256(newpassword));
    $("#resultform").submit();

});