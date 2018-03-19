var footer = document.querySelector("div#jiesuanbar");
window.onload = () => {
    const maxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    window.addEventListener("scroll", () => {
        "use strict";
    const y = window.scrollY;
    const trigger = maxY - 25;
    if (y >= trigger) {
        footer.style.marginBottom = "80px";
        footer.style.transition = "margin-bottom 0.25s"
    } else {
        footer.style.margin = "0"
    }
})
}