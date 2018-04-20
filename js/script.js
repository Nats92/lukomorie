"use strict";

// (function newsItemSizeManager() {
//     var readFullButtons = document.querySelectorAll(".news-list__item-read-full");
//     var newsItems = document.querySelectorAll(".news-list__item");

//     for (var i = 0; i < readFullButtons.length; i++) {
//;
//         if (readFullButtons[i].parentElement.clientHeight > 300) {
//             readFullButtons[i].classList.remove("hidden");
//             readFullButtons[i].parentElement.classList.add("fixed-height");

//             readFullButtons[i].addEventListener("click", function() {
//        ;

//                 if (this.parentElement.classList.contains("fixed-height")) {  
//                     var stH = this.parentElement.clientHeight;
//                     this.parentElement.classList.remove("fixed-height");
//                     var fullHeight = this.parentElement.clientHeight;

//                     var butHeight = this.clientHeight;
//                     var paddingBottomSize = butHeight + 20 + "px";
//                     this.parentElement.style.paddingBottom = paddingBottomSize;
//                     this.parentElement.style.transitionProperty = "height";
//                     this.parentElement.style.transitionDuration = "2s";
//                     this.innerHTML = "Свернуть";
//                 } else {
//                     this.innerHTML = "Читать полностью";
//                     this.parentElement.classList.add("fixed-height");
//                 }
//             })
//         }  
//     }       
// })();

(function newsManager() {
    var newsSection = document.querySelector(".main-content__news");
    var arrowLeft = newsSection.querySelector(".main-content__news-control--left");
    var arrowRight = newsSection.querySelector(".main-content__news-control--right");
    var newsList = newsSection.querySelector(".main-content__news-list");
    var newsItems = newsSection.querySelectorAll(".main-content__news-item");

    arrowRight.addEventListener("click", function() {
        arrowLeft.hasAttribute("disabled")?arrowLeft.removeAttribute("disabled"):false;
        var currIt = document.getElementById("current-new");
        for (var i = 0; i < newsItems.length; i++) {
            if (newsItems[i] === currIt) {
                var itNumber = i;  
                break;  
            }
        }
        var itWidth = newsItems[itNumber].clientWidth;
        var listWidth = itWidth + itNumber * itWidth;
        var val = "translateX(" + (-listWidth) + "px)";
        newsList.style.transform = val;
        newsList.classList.add("soft-junction");
        var currNum = itNumber + 1;
        if (currNum < newsItems.length - 1) {
            currIt.removeAttribute("id");
            newsItems[currNum].setAttribute("id", "current-new");
        } else {
            currIt.removeAttribute("id");
            newsItems[currNum].setAttribute("id", "current-new");
            arrowRight.setAttribute("disabled", "true");
        } 
    })
    arrowLeft.addEventListener("click", function() {
        arrowRight.hasAttribute("disabled")?arrowRight.removeAttribute("disabled"):false;
        var currIt = document.getElementById("current-new");
        for (var i = 0; i < newsItems.length; i++) {
            if (newsItems[i] === currIt) {
                var itNumber = i;  
                break;  
            }
        }
        var itWidth = newsItems[itNumber].clientWidth;
        var listWidth = itNumber * itWidth - itWidth;
        var val = "translateX(" + (-listWidth) + "px)";
        newsList.style.transform = val;
        newsList.classList.add("soft-junction");
        var currNum = itNumber - 1;
        if (currNum > 0) {
            currIt.removeAttribute("id");
            newsItems[currNum].setAttribute("id", "current-new");
        } else {
            currIt.removeAttribute("id");
            newsItems[currNum].setAttribute("id", "current-new");
            arrowLeft.setAttribute("disabled", "true");
        }
    })
})();

(function modalManager() {
    var modalOverlay = document.querySelector(".feedback-overlay");
    var writeUsBut = document.querySelector(".write-us");
    var closeModal = document.querySelector(".modal-feedback__form-close");

    writeUsBut.addEventListener("click", function(evt) {
        evt.preventDefault();
        modalOverlay.classList.remove("visually-hidden");

        closeModal.addEventListener("click", function () {
            modalOverlay.classList.add("visually-hidden");
        })
    })
})();

(function galleryManager() {
    var galleryBlock = document.querySelector(".main-content__gallery");
    var galleryItems = Array.from(galleryBlock.querySelectorAll(".main-content__gallery-slider-item"));
    var previewModal = galleryBlock.querySelector(".main-content__gallery-preview-overlay");
    var imgInModal = galleryBlock.querySelector(".main-content__gallery-preview img");
    var prewievClose = galleryBlock.querySelector(".main-content__gallery-preview-close");
    
    galleryItems.forEach(function(it) {
        it.addEventListener("click", function() {
            previewModal.classList.remove("hidden");
            var imgPath = it.children[0].getAttribute("src");
            var fileNameAndExpansion = imgPath.split(".");
            var biggerImgPath = fileNameAndExpansion[0] + "-big." + fileNameAndExpansion[1];

            var img = new Image();
            img.src = biggerImgPath;
            img.onload = function() { 
                imgInModal.setAttribute("src", biggerImgPath);
            };
            img.onerror = function() { 
                imgInModal.setAttribute("src", imgPath);
            };


            prewievClose.addEventListener("click", function onCloseClick() {
                previewModal.classList.add("hidden");
                prewievClose.removeEventListener("click",onCloseClick);
            })
        })
    });

    var galleryLeftControl = galleryBlock.querySelector(".main-content__gallery-slider-control--left");
    var galleryRightControl = galleryBlock.querySelector(".main-content__gallery-slider-control--right");  
    var galleryListWrap = (galleryBlock.querySelector(".main-content__gallery-slider-list-wrap"));
    var galleryList = (galleryBlock.querySelector(".main-content__gallery-slider-list"));
    var galleryItems = Array.from(galleryBlock.querySelectorAll(".main-content__gallery-slider-item"));

    galleryRightControl.addEventListener("click", function () {
        debugger
        galleryLeftControl.hasAttribute("disabled")?galleryLeftControl.removeAttribute("disabled"):false;
        var currIt = document.getElementById("current-img");

        var imgCurrIndex = galleryItems.indexOf(currIt);
        var imgWidth = currIt.clientWidth;
        var currTranslateParam = currIt.parentElement.style.transform;
        var re = /\d{1,}/;
        var translateNum = 0;
        if (currTranslateParam !== "") {
            translateNum = +currTranslateParam.match(re)[0];
        } 
        var listWidth = galleryList.clientWidth;
        var elementsAmount = Math.round(listWidth / imgWidth);
        var shiftSize = listWidth / elementsAmount;
        var val = "translateX(" + (-(shiftSize + translateNum)) + "px)";
        galleryList.style.transform = val;
        galleryList.classList.add("soft-junction");

        var currNum = imgCurrIndex + 1;
        movementOfId(elementsAmount);

        function movementOfId (number) {
            if (currNum < galleryItems.length - number) {
                currIt.removeAttribute("id");
                galleryItems[currNum].setAttribute("id", "current-img");
            } else {
                currIt.removeAttribute("id");
                galleryItems[currNum].setAttribute("id", "current-img");
                galleryRightControl.setAttribute("disabled", "true");
            }  
        }   
    })

    galleryLeftControl.addEventListener("click", function () {
        galleryRightControl.hasAttribute("disabled")?galleryRightControl.removeAttribute("disabled"):false;
        var currIt = document.getElementById("current-img");

        var imgCurrIndex = galleryItems.indexOf(currIt);
        var imgWidth = currIt.clientWidth;
        var currTranslateParam = currIt.parentElement.style.transform;
        var re = /\d{1,}/;
        var translateNum = 0;
        if (currTranslateParam !== "") {
            translateNum = +currTranslateParam.match(re)[0];
        } 
        var listWidth = galleryList.clientWidth;
        var elementsAmount = Math.round(listWidth / imgWidth);
        var shiftSize = listWidth / elementsAmount;
        var val = "translateX(" + (-(translateNum - shiftSize)) + "px)";
        galleryList.style.transform = val;
        galleryList.classList.add("soft-junction");

        var currNum = imgCurrIndex - 1;
        movementOfId(elementsAmount);

        function movementOfId (number) {
            if (currNum > 0) {
                currIt.removeAttribute("id");
                galleryItems[currNum].setAttribute("id", "current-img");
            } else {
                currIt.removeAttribute("id");
                galleryItems[currNum].setAttribute("id", "current-img");
                galleryLeftControl.setAttribute("disabled", "true");
            }  
        }   
    })
})();


// (function ieGalleryManager() {
// var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".main-content__gallery-slider-item"));
// })();