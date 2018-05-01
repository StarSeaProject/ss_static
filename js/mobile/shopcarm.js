//购物车中无物品
function NoItem(){
    let count=0;
    $(".formdata").each(function(i,div){
        count=1;
    });
    if(!count){
        $("#NoItemDiv").show();
    }
}


$(function() {
    $("#NoItemDiv").hide();
    NoItem();
});