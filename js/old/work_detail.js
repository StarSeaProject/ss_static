document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
        initWorkDetail(workImages, workTypes);
    }
}
function initWorkDetail(workImages, workTypes) {
    var moreImage = document.createElement("img");
    moreImage.src = workImages.shift().workImagePath;
    moreImage.className = "more_picture";
    var workImagesDiv = document.getElementById("workImages");
    workImagesDiv.insertBefore(moreImage, workImagesDiv.lastChild);
    document.getElementById("more_image").onclick = function () {
        if (workImages.length == 0)
            return;
        var _moreImage = document.createElement("img");
        _moreImage.src = workImages.shift().workImagePath;
        _moreImage.className = "more_picture";
        workImagesDiv.insertBefore(_moreImage, workImagesDiv.lastChild);
    };

    var gotoOrderDiv = document.getElementById("gotoOrder");
    gotoOrderDiv.onclick = function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        var xhr = createXmlHttp();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var _data = JSON.parse(xhr.responseText);
                modalalert(_data.info);
            }
        };
        xhr.open("post", "/car/add", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        var data = {
            "workId": target.getAttribute("data-workid"),
            "workTypeId": document.getElementsByClassName("active").item(0).getAttribute("data-worktypeid")
        };
        xhr.send(JSON.stringify(data));
    };

    var sum = 0;
    for (var i = 0; i < workTypes.length; i++) {
        sum += workTypes[i].stock;
    }
    var stockDiv = document.getElementById("stock");
    stockDiv.setAttribute("data-sum", sum);
    stockDiv.innerHTML = '  共' + sum + '个';
    document.getElementById("workType").onclick = function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        var stock = target.getAttribute("data-stock");
        if (stock == 0) {
            stockDiv.innerHTML = '没有库存啦';
            gotoOrderDiv.setAttribute("disabled", "disabled");
        } else if (stock != 0 && stock != undefined) {
            stockDiv.innerHTML = '  还有' + stock + "个";
        }
        var isDisabled = gotoOrderDiv.getAttribute("disabled") == "disabled";
        if (isDisabled) {
            if (stock > 0) {
                gotoOrderDiv.removeAttribute("disabled");
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