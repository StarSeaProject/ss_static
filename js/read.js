$(function () {
    $(".spinner").hide();

    $(".workimage").click(function (e) {
        let workId = $(e.target).data("workid");
        if (workId == undefined)
            return;
        window.location.href = "/work/" + workId;
    });
});
let page = 1;
let clazz="col-xs-3";
if (navigator.userAgent.match(/IEMobile|BlackBerry|Android|iPod|iPhone|iPad/i)) {
    clazz="col-xs-5";
}
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let scrollHeight = $(document).height();
    let windowHeight = $(this).height();
    if (scrollTop + windowHeight > scrollHeight - 1) {
        if (page >= total)
            return;
        $(".spinner").show();
        $.ajax({
            type: "post",
            url: "/work/ajax",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: '{"workName":"","page":"' + (page+1) + '"}',
            success: function (data) {
                console.log("length:" + data.result.length);
                if (data.result === undefined)
                    return;
                let str = "";
                page++;
                total = data.totalPage;
                for (let work of data.result) {
                    str += `<div>
						<div class="row workbox">
							<div class="${clazz} workimage">
								<img src="${work.workCover}" class="workimg img-reponsive"></img>
							</div>
							<div class="col-xs-7 workdetail">
								<p  class="h3 worktitle">${work.workName}</p>
								<p class="p workdetail">${work.workSummary}</p>
								<a data-workid=${work.workId} class="h4 detailhref" href="javascript:void(0)">&nbsp;&nbsp;查看作品&nbsp;&nbsp;</a>
							</div>
						</div>
						<hr/> 
					</div>`;
                }
                $(".spinner").hide();
                $("#works").append(str);
            }
        });
    }
});