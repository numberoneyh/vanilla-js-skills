const tabsBtn = document.querySelectorAll('.tabs__btn');
const tabsInfo = document.querySelectorAll('.tabs__info');
const clicked = document.querySelector('.tabs__btn');
const hideShowBtn = document.querySelector('.hide-show__btn');
const hideShow = document.querySelector('.hide-show__content');
const accardions = document.querySelectorAll('.jsaccordion__item');
const buttons = document.querySelectorAll('[data-modal-button]');
const modals = document.querySelectorAll('[data-modal]');
const buttonClose = document.querySelectorAll('[data-modal-close]');
const burgerBtn = document.querySelector('[data-burger]');
const dataMenu = document.querySelector('[data-menu]');
const dropDown = document.querySelectorAll('.drop-down');
const product = document.querySelectorAll('.product');
const scrollBar = document.querySelector('.cart-content__list');
const textarea = document.querySelector('[data-autoresize]');

// TABS
tabsBtn.forEach(onTabClick);
function onTabClick(item) {
  item.addEventListener('click', function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute('data-tab');
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('tabs__btn--active')) {
      tabsBtn.forEach(function (item) {
        item.classList.remove('tabs__btn--active');
      });

      tabsInfo.forEach(function (item) {
        item.classList.remove('tabs__info--active');
      });

      currentBtn.classList.add('tabs__btn--active');
      currentTab.classList.add('tabs__info--active');
    }
  });

  function active() {
    clicked.click();
  }
  active();
}

// HIDE ShOW MENU
hideShowBtn.addEventListener('click', () => {
  if (hideShow.classList.toggle('hide-show__content--active')) {
    hideShowBtn.textContent = 'Hide';
  } else {
    hideShowBtn.textContent = 'Show';
  }
});

// ACCORDIONS
accardions.forEach((el) => {
  el.addEventListener('click', (e) => {
    const self = e.currentTarget;
    const accBtn = self.querySelector('.jsaccordion__btn');
    const content = self.querySelector('.jsaccordion__content');

    if (self.classList.toggle('jsaccordion__item--open')) {
      accBtn.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
    } else {
      accBtn.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
    }
  });
});

// MODAL WINDOW
const btnFunc = (e) => {
  const currentBtn = e.target.dataset.modalButton;
  currentModal = document.querySelector('#' + currentBtn);
  currentModal.classList.add('content--active');
  currentModal.firstElementChild.addEventListener('click', (e) => e.stopPropagation());
};

buttons.forEach((e) => e.addEventListener('click', btnFunc));

buttonClose.forEach((e) =>
  e.addEventListener('click', (e) => e.target.closest('[data-modal]').classList.remove('content--active'))
);

modals.forEach((e) => e.addEventListener('click', () => currentModal.classList.remove('content--active')));

// Burger
burgerBtn.addEventListener('click', burger);
function burger(e) {
  const header = e.currentTarget.closest('.mobileNav__header');
  dataMenu.classList.toggle('mobileNav__content--active');
  header.classList.toggle('mobileNav__header--active');

  if (e.currentTarget.classList.toggle('burger--active')) {
    e.currentTarget.setAttribute('aria-expanded', 'true');
  } else {
    e.currentTarget.setAttribute('aria-expanded', 'false');
  }
}
burgerBtn.click();

// Drop Down
dropDown.forEach((item) => {
  const select = item.querySelector('.drop-down__select');
  const caret = item.querySelector('.drop-down__caret');
  const menu = item.querySelector('.drop-down__menu');
  const list = item.querySelectorAll('.drop-down__item');
  const selected = item.querySelector('.drop-down__selected');

  select.addEventListener('click', () => menu.classList.toggle('drop-down__menu--active'));

  const funcList = (e) => {
    const currentBtn = e.target;

    if ((selected.innerText = currentBtn.innerText)) {
      menu.classList.remove('drop-down__menu--active');

      list.forEach((item) => {
        item.classList.remove('drop-down__item--active');
      });

      currentBtn.classList.add('drop-down__item--active');
    }
  };

  list.forEach((item) => {
    item.addEventListener('click', funcList);
  });
});

// CARD
product.forEach((item) => {
  let currentItems = item;
  const imageSwitch = item.querySelectorAll('.image-switch__item');
  const imagePagination = item.querySelector('.image-pagination');

  if (imageSwitch.length > 1) {
    imageSwitch.forEach((item, index) => {
      item.setAttribute('data-index', index);
      imagePagination.innerHTML += `<li class="image-pagination__itam ${
        index == 0 ? 'image-pagination__itam--active' : ''
      }" data-index="${index}"></li>`;

      item.addEventListener('mouseenter', (e) => {
        currentItems.querySelectorAll('.image-pagination__itam').forEach((el) => {
          el.classList.remove('image-pagination__itam--active');

          currentItems
            .querySelector(`.image-pagination__itam[data-index="${e.currentTarget.dataset.index}"]`)
            .classList.add('image-pagination__itam--active');
        });
      });

      item.addEventListener('mouseleave', (e) => {
        currentItems.querySelectorAll('.image-pagination__itam').forEach((el) => {
          el.classList.remove('image-pagination__itam--active');

          currentItems
            .querySelector(`.image-pagination__itam[data-index="0"]`)
            .classList.add('image-pagination__itam--active');
        });
      });
    });
  }
});

// AUTORESIZE TEXTARIA
function autoResize() {
  this.style.height = 'auto';
  this.style.height = `${this.scrollHeight}px`;
}
textarea.addEventListener('input', autoResize);
