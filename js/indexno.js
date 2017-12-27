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
            document.getElementById("homepage").style.height = 800+"px";
        }
        if(widthget>1100)
        {
            document.getElementById("homepage").style.height = 800+ "px";
        }

})();
