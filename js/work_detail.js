$(function () {


    let str = `<img class="more_picture" src="${workImages.shift().workImagePath}" /><br/>`;
    $("#more_image").before(str);
    $("#more_image").on("click", () => {
    	if (workImages.length == 0)
            return;
        let str = `<img class="more_picture" src="${workImages.shift().workImagePath}" /><br/>`;
        $("#more_image").before(str);
    });

    $("#gotoOrder").on("click", function (event) {
        $.ajax({
            url: "/car/add",
            type: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: '{"workId":"' + $(event.target).data("workid") + '","workTypeId":"' + $(".active").data("worktypeid") + '"}',
            async: false,
            success: function (data) {
                modalalert(data.info);
                $("#Modalbox").on('hidden.bs.modal',function(){
                    $("#ModalSuggest").modal();
                    $("#modal-body-suggest").html(`<div class="suggest-words">右边<span class="glyphicon glyphicon-shopping-cart"></span>就是购物车按钮哦~"</div> `);
                    $(".fixedbutton").css("z-index",100);
                    $("#notunderstand").click(function(){
                        $("#modal-footer-suggest").html(`
            		        <button type="button" class="btn btn-primary btn-modal-suggest" id="suggestsubmit">提交</button>
                            `);
                        $("#modal-body-suggest").html(`
            		        <div class="suggest-words"> 这里是星之海小助手机器人，请问您需要什么帮助？</div>
            		        <input class="suggest-input" />
                        `);
                        $("#suggestsubmit").click(function(){
                            $("#modal-footer-suggest").hide();
                            $("#modal-body-suggest").html(`
				                <div class="suggest-words"> 哈！你以为我是人工智能么？</div>
                            `);
                        });
                    });
                });
            }
        });
    });

    let sum = 0;
    for (let workType of workTypes) {
        sum += workType.stock;
    }
    $("#stock").data("sum", sum);
    $("#stock").text("  共" + sum + "个");
    $("#workType").on("click", function (e) {
        let stock = $(e.target).data("stock");
        if (stock == 0) {
            $("#stock").text("没有库存啦");
            $("#gotoOrder").attr("disabled", "disabled");
        } else if (stock != 0 && stock != undefined) {
            $("#stock").text("  还有" + stock + "个");
        }
        let isDisabled = $("#gotoOrder").attr("disabled") == "disabled";
        if (isDisabled) {
            if (stock > 0) {
                $("#gotoOrder").removeAttr("disabled");
            }
        }
    });


});