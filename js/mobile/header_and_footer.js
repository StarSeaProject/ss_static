
let strlogin='';
if(user){
    strlogin=`<div class="navbar-right col-xs-4 text-right container">
            <div class="row marow">
                <div class="col-xs-4 mabox">
                    <a href="/wo3rk" class="ma text-right">作品</a> 
                </div>
                <div class="col-xs-4 mabox">
                    <a href="/activity"
                                class="ma text-right">活动</a>      
                </div>
                <div class="col-xs-4 mabox">
                    <a href="/intro"
                                class="ma text-right">关于</a>  
                </div>
		  
                
            </div>
        </div>
        <div class="navbar-right col-xs-2 text-right">
            <div id="loginbox">
            <a class="imgboxlogin">
                    <img class="userimglogin img-responsive" src="/头像.jpg"/>
                </a>
                <div id="floatbox">
                <hr>
                <a class="floatbutton" href="/user/info">个人中心</a>
                <hr>
                <a class="floatbutton" href="/user/exit">退出登录</a>
                <hr>
            </div>
            </div>
        </div>

`;
}
else{
    strlogin=`<div class="navbar-right col-xs-6 text-right container">
            <div class="row marow">
                <div class="col-xs-3 mabox">
                    <a href="/wo3rk" class="ma text-right">作品</a> 
                </div>
                <div class="col-xs-3 mabox">
                    <a href="/activity"
                                class="ma text-right">活动</a>      
                </div>
                <div class="col-xs-3 mabox">
                    <a href="/intro"
                                class="ma text-right">关于</a>  
                </div>
		  
                <div class="navbar-right col-xs-3 text-right">
                    <a href="/login" class="ma text-right">登录</a>
                </div>
            </div>
        </div>`;
}

$("body").prepend(`<div class="container-fluid">


	<div class="navbartop row">
		<div class="navbar-header col-xs-6">
			<a href="/"><img src="/starsea.png" class="navimg img-responsive"></img></a>
		</div>
        ${strlogin}
    
	</div>
	<div class="row">
		<div class="col-xs-12 imgbarcontainer">
			<img class="imgbar" src="/navbar.jpg"></img>
		</div>
	</div>
</div>`);

$("body").append(`
<div class="container-fluid">
    <div class="mfoot text-center row">
		<p class="footp">互联网ICP备案：鲁ICP备17053445号</p>
	</div>
</div>
`);

$("#floatbox").hide();
$("#loginbox").click(function(e){
        $("#floatbox").slideDown(200);
        e.stopPropagation();
        //点击其他地方关闭窗口
        $(document).on("click", function () {
            $("#floatbox").slideUp(200);
        });
    });
