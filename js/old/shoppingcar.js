function initShopcar(orderDetails, token) {
    var selectalls = document.getElementsByClassName("selectall");
    for (var i = 0; i < selectalls.length; i++) {
        selectalls[i].onclick = function () {
            var isall = this.checked;
            var selectallinputs = document.getElementsByClassName("selectallinput");
            for (var j = 0; j < selectallinputs.length; j++) {
                selectallinputs[j].checked = isall;
            }
            countchecked();
        };
    }

    document.getElementById("confbutt").onclick = function (event) {
        var e = event || window.event;
        var gotoOrderForm = document.createElement("form");
        gotoOrderForm.action = "/order/toAddOrder";
        gotoOrderForm.method = "post";
        var count = 0;
        var formdatas = document.getElementsByClassName("formdata");
        for (var i = 0; i < formdatas.length; i++) {
            var selected = formdatas[i].firstElementChild.getElementsByTagName("input")[0].checked;
            if (selected) {
                var workId = orderDetails[i].workId;
                var workTypeId = orderDetails[i].workTypeId;
                var input_hidden_workid = document.createElement("input");
                input_hidden_workid.type = "hidden";
                input_hidden_workid.name = "workTypes[" + count + "].workId";
                input_hidden_workid.value = workId;
                var input_hidden_worktypeid = document.createElement("input");
                input_hidden_worktypeid.type = "hidden";
                input_hidden_worktypeid.name = "workTypes[" + count + "].workTypeId";
                input_hidden_worktypeid.value = workTypeId;
                gotoOrderForm.appendChild(input_hidden_workid);
                gotoOrderForm.appendChild(input_hidden_worktypeid);
                count++;
            }
        }
        if (count == 0) {
            modalalert("请至少选择一个作品!");
            e.stopPropagation();
            return false;
        }
        document.body.appendChild(gotoOrderForm);
        gotoOrderForm.submit();
        document.body.removeChild(gotoOrderForm);
        return false;
    };

    document.getElementById("delselect").onclick = function (event) {
        var e = event || window.event;
        var removeWorkTypeForm = document.createElement("form");
        removeWorkTypeForm.action = "/car/removes";
        removeWorkTypeForm.method = "post";
        var count = 0;
        var formdatas = document.getElementsByClassName("formdata");
        for (var i = 0; i < formdatas.length; i++) {
            var selected = formdatas[i].firstElementChild.getElementsByTagName("input")[0].checked;
            if (selected) {
                var input_hidden_index = document.createElement("input");
                input_hidden_index.type = "hidden";
                input_hidden_index.name = "workTypes[" + count + "].index";
                input_hidden_index.value = i;
                var input_hidden_token = document.createElement("input");
                input_hidden_token.type = "hidden";
                input_hidden_token.name = "workTypes[" + count + "].token";
                input_hidden_token.value = token;
                removeWorkTypeForm.appendChild(input_hidden_index);
                removeWorkTypeForm.appendChild(input_hidden_token);
                count++;
            }
        }
        if (count == 0) {
            modalalert("请至少选择一个作品!");
            e.stopPropagation();
            return false;
        }
        input_hidden_token = document.createElement("input");
        input_hidden_token.type = "hidden";
        input_hidden_token.name = "token";
        input_hidden_token.value = token;
        removeWorkTypeForm.appendChild(input_hidden_token);
        document.body.appendChild(removeWorkTypeForm);
        if (!confirm("确定要删除选中的所有作品吗?")) {
            e.stopPropagation();
            return false;
        }
        removeWorkTypeForm.submit();
        document.body.removeChild(removeWorkTypeForm);
        return false;
    };
}