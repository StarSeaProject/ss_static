$(function () {
	if ($("#stock").text() == "库存:0") {
        $("#gotoOrder").attr("disabled", true);
    }
    $("#gotoOrder").on("click", function (event) {
        let workId = $(event.target).data("workid");
        window.location.href = "/order/toAddOrder?workId=" + workId;
    });
});