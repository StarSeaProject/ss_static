document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
        document.getElementById("NoItemDiv").style.display = "none";
        NoItem();
        window.onload = func1;
        countchecked();
        var selectallinputs = document.getElementsByClassName("selectallinput");
        for (var _i = 0; _i < selectallinputs.length; _i++) {
            selectallinputs[_i].onclick = function () {
                countchecked();
            };
        }
        initShopcar(orderDetails, token);
    }
};
function func2() {
    var footer = document.querySelector("div#jiesuanbar");
    var maxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    "use strict";
    var y = window.scrollY;
    var trigger = maxY - 25;
    if (y >= trigger) {
        footer.style.marginBottom = "30px";
        footer.style.transition = "margin-bottom 0.25s";
    } else {
        footer.style.margin = "0";
    }
}

function func1() {
    window.addEventListener("scroll", func2);
}
//购物车页面在不能提交时“确认”按钮是暗的，至少选中了一个之后就亮起来的功能
function countchecked() {
    var count = 0;
    var formdatas = document.getElementsByClassName("formdata");
    for (var i = 0; i < formdatas.length; i++) {
        var selected = formdatas[i].firstElementChild.getElementsByTagName("input")[0].checked;
        if (selected) {
            count++;
        }
    }
    if (count == 0) {
        document.getElementById("confbutt").style.background = "#999";
    } else {
        document.getElementById("confbutt").style.background = "#333";
    }
}
function NoItem() {
    var count = 0;
    var formdatas = document.getElementsByClassName("formdata");
    for (var i = 0; i < formdatas.length; i++) {
        count = 1;
    }
    if (!count) {
        document.getElementById("NoItemDiv").style.display = "block";
    }
}