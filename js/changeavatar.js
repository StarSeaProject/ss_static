function messagealert(s){
    $("#messagebox").html(`
	    <div class="alertbox">`+s+ `</div>`);
}
var formData = new FormData();

var imgWrapper = document.querySelector('#imgWrapper')
var img = imgWrapper.querySelector('img')
// var $xxxxx = document.getElementById('xxxxx')
// 初始化图片预处理工具
var zxImageProcess = new ZxImageProcess({
    // 触发文件选择的元素
    selector: '#imgWrapper',
    // 限制宽度缩放，则只需设置width值
    // 限制高度缩放，则只需设置height值
    // 同时设置了width、height值，则会对图片按尺寸裁剪
    width: 180,
    height: 180,
    submitText: 'submit',
    rotateText: 'rotate 90',
    success: function (result) {
        // 返回数据
        log(result);
        // 添加图片至目标容器
        formData.append('avatarFile', result.data);
        //$("#imgfile").attr('value',result.data);
        img.src = result.base64;
        img.style.display = '';
        //imgWrapper.className += ' hide';
    },
    error: function (err) {
        console.error(err);
        if (err.code === 9 || err.code === 22) return
        messagealert(err.msg);
    }
})
// log
function log () {
    console.log.apply(null, arguments);
}
function logStr (o) {
    log(JSON.stringify(o, null, 2))
}


$("#submitbt1").on("click",function() {
    //$("#resultform").submit();
    //var XHR = new XMLHttpRequest();
    //XHR.open('POST','/user/changeAvatar');
    //XHR.send(formData);
    if(img.src){
        $.ajax({
        url: '/user/changeAvatar',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            window.location.replace('/user/info');
        },
        error: function (data) {
            messagealert("上传失败");
        }
    });
    }
    else{
        messagealert("请选择图片");
    }

})