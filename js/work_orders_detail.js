$(function() {
	$("#gotoOrder").on("click",function(event){
		let workId=$(event.target).data("workid");
		alert(workId);
		window.location.href="/order/toAddOrder?workId="+workId;
	});
            var widthget = 0;
            if (window.innerWidth) {
                widthget = window.innerWidth;
            }
            else ((document.body) && (document.body.clientWidth))
            {
                widthget = document.body.clientWidth;
            }
            // window.alert(widthget);
            if (document.getElementById("mybar")){
                if(widthget<768)
                {
                    document.getElementById("shownav").style ="background-color:rgba(0, 73, 198, 0.55)";
                    document.getElementById("jieshaoh1").style = "padding-top: 2em; font-size:2em;";
                    document.getElementById("jieshaoh2").style = "padding-bottom: 2em;font-size: large;"
                }
                if(widthget>=500 && widthget<1100)
                {

                    document.getElementById("jieshaoh1").style = "padding-top: 3em;font-size:xx-large";
                    document.getElementById("jieshaoh2").style = "padding-bottom: 3em; font-size:x-large;"
                }
                if(widthget>=1100)
                {
                    document.getElementById("jieshaoh1").style = "padding-top: 4em;font-size:xx-large;";
                    document.getElementById("jieshaoh2").style = "padding-bottom: 4em;font-size: x-large;"

                }
            }
        }
);