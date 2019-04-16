$("#activitypage").hide();
$("#infobt").css("background-color","#323232");
$("#infobt").click(function(){
    $("#infobt").css("background-color","#323232");
    $("#activitybt").css("background-color","#777777");
    $("#activitypage").hide();
    $("#infopage").show();
    }
);

$("#activitybt").click(function(){
        $("#activitybt").css("background-color","#323232");
        $("#infobt").css("background-color","#777777");
        $("#infopage").hide();
        $("#activitypage").show();
    }
);

$("#orderbt").click(function(){
    $("#orderrcd").toggle("slow");
});

$("#acrcdbt").click(function(){
    $("#activityrcd").toggle("slow");
});


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

//初始化按钮
for (let i = 0; i < btcl; i=i+1){
    if($("#" + btarray[i]['input']).attr("value")!=0){
        let btid=$("#" + btarray[i]['input']).attr("value");
        btarray[i]['select']('#'+btarray[i]['class'] +btid);
    }
}

if($("#isDD").val()!=2){
    $(".ddbt").css("background-color","#fe5ea2");
    $(".ddtext").html(`<small>注意：你已选中了DD标签</small>`);
}


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



    $("#username").val(username);
    $("#resultform").submit();




});