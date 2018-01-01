$(function () {
	$("#activitys").on("click", function (event) {
		let activityId = $(event.target).data("activityid");
		if (activityId == undefined)
			return;
		$("#activityId").val(activityId);
		$("#activityDetail").submit();
	});
	$(".nowactbutton").on("click", function (event) {
		let activityId = $(event.target).data("activityid");
		if (activityId == undefined)
			return;
		$("#activityId").val(activityId);
		$("#activityDetail").submit();
	});
	$("#pages").on("click", function (event) {
		let page = $(event.target).text();
		$(event.target).attr("href", "/activity?page=" + page);
		$(event.target).click();
	});
});