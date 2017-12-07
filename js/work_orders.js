$(function(){
	$("#work_orders").on("click",function(event){
		let workid=$(event.target).data("workid");
		if(workid==undefined)
			return;
		$("#workId").val(workid);
		$("#workDetail").submit();
	});
	$("#pages").on("click",function(event){
		let page=$(event.target).text();
		$(event.target).attr("href","/order/getWorks?page="+page);
		$(event.target).click();
	});
});