$("body").addClass("container-fluid");
let strlogin='';
let avatarurl;
let defaultstr=`<a href="/login" class="anav">登录</a>`;
if(typeof user!='undefined'){
    if(user){
        avatarurl=user.avatar;
        strlogin=`<div id="loginbox">
            <a class="imgboxlogin" href="/user/info">
                    <img id="imgavatar" class="userimglogin img-responsive"/>
                </a>
                <div id="floatbox">
                <hr>
                <a class="floatbutton" href="/user/info">个人中心</a>
                <hr>
                <a class="floatbutton" href="/user/exit">退出登录</a>
                <hr>
            </div>
            </div>`
        ;
    }
    else{
        strlogin=defaultstr;
    }
}
else{
    strlogin=defaultstr;
}

$("body").prepend(`
    <div class="container-fluid common-navbar">
        <nav class="row heading" role="navigation" id="mybar">
            <div class="navbar-header" >
                <a href="/" class="col-sm-4">
                    <img src="/starsea.png" class="navimg"></img>
                </a>
                <span class="col-sm-4">
                    </span>
                <button class="navbar-toggle col-sm-4" data-toggle="collapse"
                        data-target="#shownav" id="btnnav">
                    <span class="glyphicon glyphicon-menu-hamburger"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse navbar-right" id="shownav">
                <ul class="nav navbar-nav mynavul">
                    <li class="myli">`+strlogin+`</li>
                    <li class="myli"><a href="/work" class="anav">作品阅览</a></li>
                    <li class="myli"><a href="/activity" class="anav">活动众筹</a></li>
                    <li class="myli"><a href="/intro" class="anav">组织介绍</a></li>
                </ul>
            </div>
        </nav>
    </div>
`);
$("body").append(`
    <div class="footbar text-center">
    <hr>
		<p class="footbarpara">互联网ICP备案：鲁ICP备17053445号</p>
	</div>
`);
if(avatarurl){
    $("#imgavatar").attr('src',avatarurl);
}
$("#floatbox").hide();
$("#loginbox").hover(function(){
    $("#floatbox").slideToggle(200);
},
    function(){
        $("#floatbox").slideToggle(200);
    });
