(function() {
            var widthget = 0;
            if (window.innerWidth) {
                widthget = window.innerWidth;
            }
            else ((document.body) && (document.body.clientWidth))
            {
                widthget = document.body.clientWidth;
            }
            // window.alert(widthget);
            if (document.getElementById("mybar")){
                if(widthget<768)
                {
                    document.getElementById("shownav").style ="background-color:rgba(0, 73, 198, 0.55)";

                }
                if(widthget>=500 && widthget<1100)
                {

                }
                if(widthget>=1100)
                {


                }
            }
        }
    )();