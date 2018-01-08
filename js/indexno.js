(function () {
    var widthget = 0;
    if (window.innerWidth) {
        widthget = window.innerWidth;
    }
    switch (widthget) {
        case 1280:
            document.getElementById("homepage").style.height = 600 + "px";
        case 1366:
            document.getElementById("homepage").style.height = 600 + "px";
        case 1920:
            document.getElementById("homepage").style.height = 800 + "px";
        case 1024:
            document.getElementById("homepage").style.height = 600 + "px";
        case 1600:
            document.getElementById("homepage").style.height = 700 + "px";
    }
})();
