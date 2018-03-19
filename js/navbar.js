(function () {
    var widthget = 0;
    if (window.innerWidth) {
        widthget = window.innerWidth;
    }
    switch (widthget) {
        case 1280:
            document.getElementById("heading").style.height = 240 + "px";
        case 1366:
            document.getElementById("heading").style.height = 256 + "px";
        case 1920:
            document.getElementById("heading").style.height = 360 + "px";
        case 1024:
            document.getElementById("heading").style.height = 192 + "px";
        case 1600:
            document.getElementById("heading").style.height = 300 + "px";
		case 2160:
			document.getElementById("heading").style.height = 405 + "px";
		case 3840:
			document.getElementById("heading").style.height = 720 + "px";
    }
})();
