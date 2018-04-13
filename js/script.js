"use strict";

(function newsItemSizeManager() {
    var readFullButtons = document.querySelectorAll(".news-list__item-read-full");
    var newsItems = document.querySelectorAll(".news-list__item");

    for (var i = 0; i < readFullButtons.length; i++) {
        debugger;
        if (readFullButtons[i].parentElement.clientHeight > 300) {
            readFullButtons[i].classList.remove("hidden");
            readFullButtons[i].parentElement.classList.add("fixed-height");

            readFullButtons[i].addEventListener("click", function() {
                debugger;

                if (this.parentElement.classList.contains("fixed-height")) {  
                    this.parentElement.classList.remove("fixed-height");
                    var butHeight = this.clientHeight;
                    var paddingBottomSize = butHeight + 20 + "px";
                    this.parentElement.style.paddingBottom = paddingBottomSize;
                    this.innerHTML = "Свернуть";
                } else {
                    this.innerHTML = "Читать полностью";
                    this.parentElement.classList.add("fixed-height");
                }
            })
        }  
    }
        
})();