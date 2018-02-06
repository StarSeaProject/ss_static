let page = 1;
let status = 2;
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let scrollHeight = $(document).height();
    let windowHeight = $(this).height();
    if (scrollTop + windowHeight > scrollHeight - 1) {
        if (page >= total)
            return;
        $.ajax({
            type: "post",
            url: "/question/ajax",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: '{"questionStatus":"' + status + '","page":"' + page + '"}',
            success: function (data) {
                if (data.result === undefined)
                    return;
                let str = "";
                page++;
                total = data.totalPage;
                for (let question of data.result) {
                    str += `<div>
                    			<div class="row qaBox">
                    				<div class="col-sm-12 col-md-10 qBox">
                    					<p class="qText">
                    					Q:${question.question}
                    					</p>
                    				</div>
                    				<div class="col-sm-12 col-md-10 aBox">
                    					<p class="aText">
                    					A:${question.answer}
                    					</p>
                    				</div>
                    			</div>
					</div>`;
                }
                $("#questions").append(str);
            }
        });
    }
});