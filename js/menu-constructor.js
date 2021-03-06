const pageMenuAnchorContainer = document.querySelector('.page-menu__anchors-wrap');
const pageMenuContainer = document.querySelector('.page-menu__menu-wrap');

const renderSectionMenu = (menuObject) => {
  menuObject.forEach((element) => {
    const section = document.createElement('section');
    section.classList.add('menu-item');
    section.id = element.id;
    section.innerHTML = `<h2 class="menu-item__title  section-title">${element.groupName}</h2>`;
    renderDishes(section, element);
    pageMenuContainer.appendChild(section);
    renderAnchors(element.id,element.groupName);
  });
};

const renderDishes = (section, data) => {
  data.dishes.forEach((element) => {
    if (element.subTitle) {
      section.innerHTML += `<h3 class="menu-item__subtitle">${element.subTitle}</h3>`;
    } else if (element.description && element.unit === 'мл') {
      section.innerHTML +=
        `<div class="menu-item__menu-line">
            <div class="menu-item__dish-name-descr-wrap">
              <h4 class="menu-item__dish-name">${element.name}&nbsp<span class="menu-item__dish-weight-ml" aria-label="выход напитка в миллилитрах">${element.weight}</span></h4>
              <span class="menu-item__dish-name-descr">${element.description}</span></div>
            <span class="menu-item__dish-price" aria-label="цена в рублях">${element.price}</span>
          </div>`;
    } else if (element.description) {
      section.innerHTML +=
        `<div class="menu-item__menu-line">
            <div class="menu-item__dish-name-descr-wrap">
              <h4 class="menu-item__dish-name">${element.name}&nbsp<span class="menu-item__dish-weight" aria-label="выход блюда в граммах">${element.weight}</span></h4>
              <span class="menu-item__dish-name-descr">${element.description}</span></div>
            <span class="menu-item__dish-price" aria-label="цена в рублях">${element.price}</span>
          </div>`;
    } else if (element.unit === 'мл') {
      section.innerHTML +=
        `<div class="menu-item__menu-line">
            <div class="menu-item__dish-name-descr-wrap">
              <h4 class="menu-item__dish-name">${element.name}&nbsp<span class="menu-item__dish-weight-ml" aria-label="выход напитка в миллилитрах">${element.weight}</span></h4>
              </div>
            <span class="menu-item__dish-price" aria-label="цена в рублях">${element.price}</span>
          </div>`;
    } else {
      section.innerHTML +=
        `<div class="menu-item__menu-line">
          <div class="menu-item__dish-name-descr-wrap">
            <h4 class="menu-item__dish-name">${element.name}&nbsp<span class="menu-item__dish-weight" aria-label="выход блюда в граммах">${element.weight}</span></h4>
          </div>
          <span class="menu-item__dish-price" aria-label="цена в рублях">${element.price}</span>
        </div>`;}
  });
};

const renderAnchors = (id, description) => {
  pageMenuAnchorContainer.innerHTML += `<a class="page-menu__anchors-item" href="menu.html#${id}">${description}</a>`
};

export {renderSectionMenu};
