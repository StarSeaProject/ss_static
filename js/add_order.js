$(function(){
	$("#addOrderBtn").on("click",function(){
		$("#orderArea").val($("#area").val());
		$("#addOrderForm").submit();
	});
});