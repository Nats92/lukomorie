"use strict";!function(){var t=document.querySelector(".main-nav__menu-list");Array.prototype.slice.call(t.querySelectorAll(".main-nav__link")).forEach(function(t){t.addEventListener("click",function(t){var e=t.target,r=e.getAttribute("href").length,n=e.getAttribute("href").substr(1,r),c=document.querySelector("#"+n);if(c)var l=c.offsetTop,o=0,i=l/100,a=setInterval(function(){(o+=i)>l&&(o=l),window.scrollTo(0,o),o===l&&clearInterval(a)},5)})})}();
