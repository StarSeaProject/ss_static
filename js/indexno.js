(function() {
    var widthget = 0;
    if (window.innerWidth) {
        widthget = window.innerWidth;
    }
        if(widthget<500)
        {
            document.getElementById("homepage").style.height = widthget *1.2+ "px";
        }
        if(widthget>500&&widthget<1100)
        {
            document.getElementById("homepage").style.height = window.innerHeight + "px";
        }
        if(widthget>1100)
        {
            document.getElementById("homepage").style.height = widthget * 0.5 + "px";
        }

        if(widthget<500)
        {
            document.getElementById("homeword").style.paddingTop = 130 + "px";
            document.getElementById("jieshao").className = "container jieshao";
            document.getElementById("jieshaoh1").style = "padding-top: 2em; font-size:2em;"
            document.getElementById("jieshaoh2").style = "padding-bottom: 2em;font-size: large;"
        }
        if(widthget>=500 && widthget<1500)
        {
            document.getElementById("homeword").style.paddingTop = 400 + "px";
            document.getElementById("jieshao").className = "container jieshao container jieshao col-xs-6 col-xs-offset-2";
            document.getElementById("jieshaoh1").style = "padding-top: 3em;font-size:xx-large"
            document.getElementById("jieshaoh2").style = "padding-bottom: 3em; font-size:x-large;"
        }
        if(widthget>=1500)
        {
            document.getElementById("homeword").style.paddingTop = widthget*0.4 + "px";
            document.getElementById("jieshao").className = "container jieshao container jieshao col-xs-6 col-xs-offset-3";
            document.getElementById("jieshaoh1").style = "padding-top: 4em;font-size:xx-large;"
            document.getElementById("jieshaoh2").style = "padding-bottom: 4em;font-size: x-large;"

        }

})();
