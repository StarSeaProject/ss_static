$(function() {
	$("#works").on("click",function(event){
		let workId=$(event.target).data("workid");
		if(workId==undefined)
			return;
		$("#workId").val(workId);
		$("#workDetail").submit();
	});
	$("#pages").on("click",function(event){
		let page=$(event.target).text();
		$(event.target).attr("href","/work/?page="+page);
		$(event.target).click();
	});
});