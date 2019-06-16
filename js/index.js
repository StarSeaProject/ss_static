$(function() {
    windowwidth=$(window).width();
    console.log(windowwidth);
    if(windowwidth<1920){$(window).scrollLeft((1920-windowwidth)/2);}
    let avatarurl;
    let stra;
    let defaultstr=`
    <div id="usernav">
			<img class="buttonimg" id="uimg1" src="/3.png">
			<a class="usernavbutton" id="ubt1" href="/login">
				<p class="ubuttontext">登录</p>
			</a>
			<span id="unavtext" >|</span>
			<a class="usernavbutton" id="ubt2" href="/regist">
				<p class="ubuttontext">注册</p>
			</a>
		</div>
    
    `;

    if(typeof user!='undefined'){
        if(user){
            avatarurl=user.avatar;
            stra=`
		<div id="usernav">
			<a class="usernavimgbutton"  href="/user/info">
				<img class="img-circle" id="userimg">
			</a>
			<p class="" id="unavtext1">${user.username}</p>
			<a class="usernavbutton" id="ubt3" href="/user/exit">
				<p class="ubuttontext">退出</p>
			</a>
		</div>`
        }
        else{
            stra=defaultstr;
        }
    }
    else{
        stra=defaultstr;
    }
    if(avatarurl){
        $("#userimg").attr('src',avatarurl);
    }
    $("#navup").append(stra)

});