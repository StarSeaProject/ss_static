document.onreadystatechange = function () {
    if (document.readyState == 'loader' || document.readyState == 'complete' || document.readyState == 'interactive') {
        initWorkDetail();
    }
}
function initWorkDetail() {
    var moreImage = document.createElement("img");
    moreImage.src = workImages.shift().workImagePath;
    var workImages = document.getElementById("workImages");
    workImages.insertBefore(moreImage, workImages.lastChild);
    document.getElementById("more_image").onclick = function () {
        if (workImages.length == 0)
            return;
        var _moreImage = document.createElement("img");
        _moreImage.src = workImages.shift().workImagePath;
        workImages.insertBefore(_moreImage, workImages.lastChild);
    }

    document.getElementById("gotoOrder").onclick = function (event) {
        var xhr = createXmlHttp();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var _data = xhr.responseText;
                modalalert(_data.info);
            }
        }
        xhr.open("post", "/car/add", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        var data = {
            "workId": event.target.getAttribute("data-workid"),
            "workTypeId": document.getElementsByClassName("active").getAttribute("data-worktypeid")
        };
        xhr.send(JSON.stringify(data));
    }

    var sum = 0;
    for (var i = 0; i < workTypes.length; i++) {
        sum += workTypes[i].stock;
    }
    document.getElementById("stock").setAttribute("data-sum", sum);
    document.getElementById("stock").innerHTML = '  共' + sum + '个';
    document.getElementById("workType").onclick = function (event) {
        var stock = event.target.getAttribute("data-stock");
        if (stock == 0) {
            document.getElementById("stock").innerHTML = '没有库存啦';
            document.getElementById("gotoOrder").setAttribute("disabled", "disabled");
        } else if (stock != 0 && stock != undefined) {
            document.getElementById("stock").innerHTML = '  还有' + stock + "个";
        }
        var isDisabled = document.getElementById("gotoOrder").getAttribute("disabled") == "disabled";
        if (isDisabled) {
            if (stock > 0) {
                document.getElementById("gotoOrder").removeAttribute("disabled");
            }
        }
    }
}
function createXmlHttp() {
    var xmlHttp;
    try { // Firefox, Opera 8.0+, Safari 
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        try {// Internet Explorer 
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }
    return xmlHttp;
} 