$(function () {
    let str = `<img style="width: 70%" src="${workImages.shift().workImagePath}" /><br/>`;
    $("#more_image").before(str);
    $("#more_image").on("click", () => {
        let str = `<img style="width: 70%" src="${workImages.shift().workImagePath}" /><br/>`;
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
                alert(data.info);
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
$(window).scroll(function () {
    const y = $(window).height();
    const cury = $(window).scrollTop() + y - 100;
    $('#cardiv').css("left", "90%").css("top", cury + "px");
});