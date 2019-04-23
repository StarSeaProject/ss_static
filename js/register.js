let spcolorcharaarray=["#7ecbf7","#f08300","#ff9999","#229977", "#ff4a4a", "#44aaff","#7a7a7a","#dbb623","#d47aff","#ff5599","#90D7EC","#cccccc"];
let spcolorteamarray=["white","#ffaa01","#fe5ea2","#825deb","#cd3935"];


function charabtselect(tag){
    $(tag).css("background-color", spcolorcharaarray[$(tag).attr("name")]);
    if ($(tag).attr("name") != 11) {
        $(tag).css("color", "white");
    }
}

function charabtreset(tag){
    $(tag).css("background-color", spcolorcharaarray[0]);
    $(tag).css("color", "black");
}

function teambtselect(tag){
    $(tag).css("background-color", spcolorteamarray[$(tag).attr("name")]);
}

function teambtreset(tag){
    $(tag).css("background-color", spcolorteamarray[0]);
}

function gradebtselect(tag){
    $(tag).css("background-color", "#2fa4f7");
}

function gradebtreset(tag){
    $(tag).css("background-color", "#7ecbf7");
}

let btarray=[{class:"charabt",input:"osuPerson",select:charabtselect,reset:charabtreset},
    {class:"teambt",input:"osuTeam",select:teambtselect,reset:teambtreset},
    {class:"gradebt",input:"osuGrade",select:gradebtselect,reset:gradebtreset}];
btcl=btarray.length;

$(".bt").hover(function() {
        let i;
        for (i = 0; i < btcl; i=i+1) {
            if ($(this).hasClass(btarray[i]['class'])) {
                if ($(this).attr("name") != $("#" + btarray[i]['input']).attr("value")) {
                    btarray[i]['select'](this);
                }
                break;
            }
        }
    },
    function() {
        let i;
        for (i = 0; i < btcl; i=i+1) {
            if ($(this).hasClass(btarray[i]['class'])) {
                if ($(this).attr("name") != $("#" + btarray[i]['input']).attr("value")) {
                    btarray[i]['reset'](this);
                }
                break;
            }

        }
    });

$(".bt").click(function() {
        let i;
        for (i = 0; i < btcl; i=i+1) {
            if ($(this).hasClass(btarray[i]['class'])) {
                if($("#" + btarray[i]['input']).attr("value")!=0) {
                    let previousid = '#'+btarray[i]['class'] + $("#" + btarray[i]['input']).attr("value");
                    btarray[i]['reset'](previousid);
                }
                if($("#" + btarray[i]['input']).attr("value")==$(this).attr("name"))
                {
                    $("#" + btarray[i]['input']).attr("value",0);
                }
                else{
                    btarray[i]['select'](this);
                    $("#" + btarray[i]['input']).attr("value",$(this).attr("name"));
                }
                break;
            }
        }
    }
);


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
        $(".ddtext").html(`<small>（若选中则代表全部角色的应援物都可以接受）</small>`);
    }
    else{
        $(this).css("background-color","#fe5ea2");
        $("#isDD").attr("value",1);
        $(".ddtext").html(`<small>注意：你已选中了DD标签</small>`);
    }

});

function messagealert(s){
    $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
}

function clearalert(s){
    messagealert(s);
    $("#formpassword").val("");
    $("#formpassword2").val("");
    $("#formvcode").val("");
    $("[alt='验证码']").trigger("click");
}

$("#submitbt1").click(function(){
    let username=$("#formusername").val();
    if (!username){
        messagealert("昵称不能为空");
        return false;
    }
    if (username.length>30){
        messagealert("昵称长度不能超过30");
        return false;
    }
    let userEmail=$("#formuserEmail").val();
    if(!userEmail){
        messagealert("用户邮箱不能为空");
        return false;
    }
    if(userEmail.length>100){
        messagealert("用户邮箱长度不能超过100");
        return false;
    }
    var reg = /\w+[@]{1}\w+[.]\w+/;
    if (!reg.test(userEmail)) {
        messagealert("Email格式错误");
        return false;
    }
    let password=$("#formpassword").val();
    if(!password){
        clearalert("用户密码不能为空");
        return false;
    }

    if(password!=$("#formpassword2").val()){
        clearalert("用户密码与确认密码不匹配");
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
    }

    let vcode=$("#formvcode").val();
    if(!vcode){
        clearalert("验证码不能为空")
        return false;
    }

    let data={userEmail:userEmail};
    $.post("/user/check",data, function(result){
        if(result.isAvailable== false){
            clearalert(result.errInfo);
            return false;
        }
        else{
            $("#userEmail").val(userEmail);
            $("#userPassword").val(sha256(password));
            $("#username").val(username);
            $("#verifyCode").val(vcode);
            $("#resultform").submit();
        }
    });




});