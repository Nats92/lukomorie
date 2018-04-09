'use strict';
// (function () {
//   var buttonCloseMenuList = document.querySelector('#closeMenuList');
//   var menuList = document.querySelector('.menu-list');
//   var menu = document.querySelector('nav');
//   function showMenu() {
//     var width = window.innerWidth;
//     if (width <= 480) {
//       menu.classList.remove('menu');
//       menu.classList.add('small-menu');
//       menuList.classList.add('hidden');
//       buttonCloseMenuList.classList.remove('hidden');
//     } else {
//       menu.classList.remove('small-menu');
//       menu.classList.add('menu');
//       menuList.classList.remove('hidden');
//       buttonCloseMenuList.classList.add('hidden');
//     }
//   }

//   window.onresize = showMenu;
//   window.onload = showMenu;

//   menu.addEventListener('click', function (evt) {
//     var target = evt.target;
//     if (target === buttonCloseMenuList) {
//       menuList.classList.add('hidden');
//       menu.classList.remove('menu');
//       menu.classList.add('small-menu');
//     } else {
//       menuList.classList.remove('hidden');
//       menu.classList.remove('small-menu');
//       menu.classList.add('menu');
//     }
//   });


//   var buttonTop = document.querySelector('#toTop');
//   function returnUp() {
//     window.scrollTo(0,0);
//   }

//   window.onscroll = function() {
//     if (window.pageYOffset >= 150) {
//       buttonTop.classList.remove('hidden');
//       buttonTop.addEventListener('click', returnUp);
//     } else {
//       buttonTop.classList.add('hidden');
//       buttonTop.removeEventListener('click', returnUp);
//     }
//   };
// })();


