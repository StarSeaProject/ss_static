let spcolorcharaarray=["#7ecbf7","#f08300","#ff9999","#229977", "#ff4a4a", "#44aaff","#7a7a7a","#dbb623","#d47aff","#ff5599","#90D7EC","#ffffff"];
let spcolorteamarray=["white","#ffaa01","#fe5ea2","#825deb"];
let spcolorgrouparray=[["#2fa4f7","white","#2fa4f7"],["white","#2fa4f7","white"],["black","white","#cd3935"]];

$(".charabt").hover(function(){
        if($(this).attr("name")!=$("#osuPerson").attr("value")) {
            $(this).css("background-color", spcolorcharaarray[$(this).attr("name")]);
            if ($(this).attr("name") != 11) {
                $(this).css("color", "white");
            }
        }
    },
    function(){
        if($(this).attr("name")!=$("#osuPerson").attr("value")) {
            $(this).css("background-color", spcolorcharaarray[0]);
            $(this).css("color", "black");
        }
    });

$(".charabt").click(function(){
    if($("#osuPerson").attr("value")!=0) {
        let previousid = '#charabt' + $("#osuPerson").attr("value");
        $(previousid).css("background-color", spcolorcharaarray[0]);
        $(previousid).css("color", "black");
    }
    if($("#osuPerson").attr("value")==$(this).attr("name"))
    {
        $("#osuPerson").attr("value",0);
    }
    else{
        $(this).css("background-color",spcolorcharaarray[$(this).attr("name")]);
        if ($(this).attr("name")!=11){
            $(this).css("color","white");
        }
        $("#osuPerson").attr("value",$(this).attr("name"));
    }

});

$(".teambt").hover(function(){
        if($(this).attr("name")!=$("#osuTeam").attr("value")) {
            $(this).css("background-color", spcolorteamarray[$(this).attr("name")]);
        }
    },
    function(){
        if($(this).attr("name")!=$("#osuTeam").attr("value")) {
            $(this).css("background-color", spcolorteamarray[0]);
        }
    });

$(".teambt").click(function(){
    if($("#osuTeam").attr("value")!=0) {
        let previousid = '#teambt' + $("#osuTeam").attr("value");
        $(previousid).css("background-color", spcolorteamarray[0]);
    }
    if($("#osuTeam").attr("value")==$(this).attr("name"))
    {
        $("#osuTeam").attr("value",0);
    }
    else{
        $(this).css("background-color",spcolorteamarray[$(this).attr("name")]);
        $("#osuTeam").attr("value",$(this).attr("name"));
    }

});

$(".gradebt").hover(function(){
        if($(this).attr("name")!=$("#osuGrade").attr("value")) {
            $(this).css("background-color", "#2fa4f7");
        }
    },
    function(){
        if($(this).attr("name")!=$("#osuGrade").attr("value")) {
            $(this).css("background-color", "#7ecbf7");
        }
    });

$(".gradebt").click(function(){
    if($("#osuGrade").attr("value")!=0) {
        let previousid = '#gradebt' + $("#osuGrade").attr("value");
        $(previousid).css("background-color", "#7ecbf7");
    }
    if($("#osuGrade").attr("value")==$(this).attr("name"))
    {
        $("#osuGrade").attr("value",0);
    }
    else{
        $(this).css("background-color","#2fa4f7");
        $("#osuGrade").attr("value",$(this).attr("name"));
    }

});

$(".groupbt").hover(function(){
        if($(this).attr("name")!=$("#osuGroup").attr("value")) {
            $(this).css("border-color", spcolorgrouparray[$(this).attr("name")][0]);
            $(this).css("background-color", spcolorgrouparray[$(this).attr("name")][1]);
            $(this).css("color", spcolorgrouparray[$(this).attr("name")][2]);
        }
    },
    function(){
        if($(this).attr("name")!=$("#osuGroup").attr("value")) {
            $(this).css("border-color", spcolorgrouparray[0][0]);
            $(this).css("background-color", spcolorgrouparray[0][1]);
            $(this).css("color", spcolorgrouparray[0][2]);
        }
    });

$(".groupbt").click(function(){
    if($("#osuGroup").attr("value")!=0) {
        let previousid = '#groupbt' + $("#osuGroup").attr("value");
        $(previousid).css("border-color", spcolorgrouparray[0][0]);
        $(previousid).css("background-color", spcolorgrouparray[0][1]);
        $(previousid).css("color", spcolorgrouparray[0][2]);
    }
    if($("#osuGroup").attr("value")==$(this).attr("name"))
    {
        $("#osuGroup").attr("value",0);
    }
    else{
        $(this).css("border-color", spcolorgrouparray[$(this).attr("name")][0]);
        $(this).css("background-color", spcolorgrouparray[$(this).attr("name")][1]);
        $(this).css("color", spcolorgrouparray[$(this).attr("name")][2]);
        $("#osuGroup").attr("value",$(this).attr("name"));
    }

});

$(".ddbt").hover(function(){
        if($(this).attr("name")!=$("#isDD").attr("value")) {
            $(this).css("background-color", "#fe5ea2");
        }
    },
    function(){
        if($(this).attr("name")!=$("#isDD").attr("value")) {
            $(this).css("background-color", "#103e99");
        }
    });

$(".ddbt").click(function(){
    if($("#isDD").attr("value")==$(this).attr("name"))
    {
        $(this).css("background-color","#103e99");
        $("#isDD").attr("value",2);
        $(".ddtext").html(`<small>（若选中则代表全部角色的应援物都可以接受）</small>`)
    }
    else{
        $(this).css("background-color","#fe5ea2");
        $("#isDD").attr("value",1);
        $(".ddtext").html(`<small>注意：你已选中了DD标签</small>`)
    }

});

function messagealert(s){
    $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
}

$("#submitbt1").click(function(){
    let username=$("#formusername").val();
    if (!username){
        messagealert("昵称不能为空")
        return false;
    }
    if (username.length>30){
        messagealert("昵称长度不能超过30")
        return false;
    }
    let userEmail=$("#formuserEmail").val();
    if(!userEmail){
        messagealert("用户邮箱不能为空")
        return false;
    }
    if(userEmail.length>100){
        messagealert("用户邮箱长度不能超过100")
        return false;
    }
    var reg = /\w+[@]{1}\w+[.]\w+/;
    if (!reg.test(userEmail)) {
        messagealert("Email格式错误");
        return false;
    }
    let password=$("#formpassword").val();
    if(!password){
        messagealert("用户密码不能为空")
        return false;
    }

    let isDD=$("#isDD").val();
    if(isDD==2){
        if($("#osuPerson").val()==0){
            messagealert("请选择所推成员")
            return false;
        }
        if($("#osuTeam").val()==0){
            messagealert("请选择所推小队")
            return false;
        }
        if($("#osuGrade").val()==0){
            messagealert("请选择所推年级")
            return false;
        }
        if($("#osuGroup").val()==0){
            messagealert("请选择所推团队")
            return false;
        }
    }

    let data={userEmail:userEmail};
    $.post("/user/check",data, function(result){
        if(result.isAvailable== false){
            messagealert(result.errInfo);
            return false;
        }
        else{
            $("#userEmail").val(userEmail);
            $("#userPassword").val(sha256(password));
            $("#username").val(username)
            $("#resultform").submit();
        }
    });




});