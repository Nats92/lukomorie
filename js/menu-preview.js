const menuPreviewContainer = document.querySelector('.main-content__menu-links-container');

const renderMenuPreview = (menu) => {
  menu.forEach((element) => {
    menuPreviewContainer.innerHTML +=
        `<a class="main-content__menu-link" href="menu.html#${element.id}">
            <img src="${element.image}" width="250" height="125">
            <h3>${element.groupName}</h3>
         </a>`;
  });
};

export {renderMenuPreview};
