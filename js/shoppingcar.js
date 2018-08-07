$(function () {
	// 全选功能

	$(".selectall").click(function () {
		var isall = $(this).prop("checked");
		var status = $(".selectallinput").prop("checked", isall);
		countchecked();
	});

	$("#confbutt").on("click", function (e) {
		let gotoOrderForm = $(`<form action="/order/toAddOrder" method="post"></form>`);
		let workTypes = "";
		let count = 0;
		$(".formdata").each(function (i, div) {
			const selected = $(div).eq(0).find("input").is(':checked');
			if (selected) {
				const workId = orderDetails[i].workId;
				const workTypeId = orderDetails[i].workTypeId;
				workTypes += `<input type="hidden" name="workTypes[${count}].workId" value="${workId}"/>`;
				workTypes += `<input type="hidden" name="workTypes[${count}].workTypeId" value="${workTypeId}"/>`;
				count++;
			}
		});
		if (count == 0) {
			modalalert("请至少选择一个作品!");
			e.stopPropagation();
			return false;
		}
		gotoOrderForm.append(workTypes);
		gotoOrderForm.appendTo(document.body);
		gotoOrderForm.submit();
		document.body.removeChild(gotoOrderForm[0]);
		return false;
	});

	$("#delselect").on("click", function (e) {
		let count = 0;
		let removeWorkTypeForm = $(`<form action="/car/removes" method="post"></form>`);
		let workTypes = "";
		$(".formdata").each(function (i, div) {
			const selected = $(div).eq(0).find("input").is(':checked');
			if (selected) {
				workTypes += `<input type="hidden" name="workTypes[${count}].index" value="${i}" />`;
				workTypes += `<input type="hidden" name="workTypes[${count}].token" value="${token}" />`;
				count++;
			}
		});
		if (count == 0) {
			modalalert("请至少选择一个作品!");
			e.stopPropagation();
			return false;
		}
		workTypes += `<input type="hidden" name="token" value="${token}"/>`;
		removeWorkTypeForm.append(workTypes);
		removeWorkTypeForm.appendTo(document.body);
		if (!confirm("确定要删除选中的所有作品吗?")) {
			e.stopPropagation();
			return false;
		}
		removeWorkTypeForm.submit();
		document.body.removeChild(removeWorkTypeForm[0]);
		return false;
	});
});