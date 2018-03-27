$(function () {
    $("#askQuestion").on("submit", function () {
        let message = $("#message").val();
        if (message === undefined || message === "") {
            alert("问题内容不能为空");
            return false;
        }
        if (message.length > 150) {
            alert("问题内容长度不能超过150个字");
            return false;
        }
    });


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

    //如果无问题则显示
    let count=0;
    $(".qaBox").each(function(i,div){
        count=1;
    });
    if (!count){
        let str=`<div>
                    <div class="row noitem">
                        暂无问题显示
                    </div>
				</div>
        `;
        $("#questions").append(str);
    }
});


