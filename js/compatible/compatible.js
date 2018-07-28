function compatible(iePath, otherPath) {
    var userAgent = window.navigator.userAgent;
    console.log(userAgent);
    if (userAgent.indexOf("MSIE 5.0") != -1 || userAgent.indexOf("MSIE 6.0") != -1 || userAgent.indexOf("MSIE 7.0") != -1 || userAgent.indexOf("MSIE 8.0") != -1) {
        alert("浏览器版本过低!请换成更高版本的浏览器!");
    } else if (!!window.ActiveXObject || "ActiveXObject" in window) {
        document.write('<script type="text/javascript" src="' + iePath + '"><\/script>');
    } else {
        document.write('<script type="text/javascript" src="' + otherPath + '"><\/script>');
    }
}