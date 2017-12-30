(function() {
    var widthget = 0;
    if (window.innerWidth) {
        widthget = window.innerWidth;
    }
	document.getElementById("homepage").style.height = widthget*0.5625 + "px";
})();
