$(function () {
    var x = document.getElementById("front");
    if (x.innerHTML == "") {
        $("#frontbox").hide();

    }

    var x = document.getElementById("back");
    if (x.innerHTML == "") {
        $("#backbox").hide();
    }
});