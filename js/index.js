if(window.innerWidth<500)
    document.getElementById("shownav").style="background:rgba(211,211,211,0.5)";
(function(){
    pos = 0;
    ticking = false;
    var header = document.querySelector("nav#mybar");
    window.addEventListener("scroll", function(){
        pos = window.scrollY;
        if(pos > 70&&!ticking){

            header.classList.add("scrolledDown");

            ticking = true;
            $("#mybar").attr("style","background:rgba(99,99,99,0.7)");
        }
        if(pos < 70 && ticking){

            header.classList.remove("scrolledDown");
            ticking = false;
            $("#mybar").attr("style","background:transient");
        }
    });
})();