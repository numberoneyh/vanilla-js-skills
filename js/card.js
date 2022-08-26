const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = cart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
const goToCart = document.querySelector('.cart-content__btn');
const goToProductList = document.querySelector('.order-modal__list');
const modalBtnList = document.querySelector('.order-modal__btn');
const modalContent = document.querySelector('#modal-3');

let price = 0;
let array = [];

const randomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
  return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullprice = (currentPrice) => {
  return (price += currentPrice);
};

const minusFullprice = (currentPrice) => {
  return (price -= currentPrice);
};

const printFullprice = () => {
  fullPrice.textContent = `${normalPrice(price)} $`;
};

const printQuantity = () => {
  let length = cartProductsList.querySelector('.simplebar-content').children.length;
  cartQuantity.textContent = length;

  length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const deleteProducts = (parentProduct) => {
  let id = parentProduct.querySelector('.cart-product').dataset.id;
  document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;

  let currentPrice = parseInt(priceWithoutSpaces(parentProduct.querySelector('.cart-product__price').textContent));

  minusFullprice(currentPrice);
  printFullprice();
  parentProduct.remove();
  printQuantity();
};

const generateCartProduct = (img, title, price, id) => {
  return `<li class="cart-content__item">
  <article class="cart-content__product cart-product" data-id="${id}">
    <img
      src="${img}"
      alt="MacBook"
      class="cart-product__img"
    />
    <div class="cart-product__text">
      <h3 class="cart-product__title">
        ${title}
      </h3>
      <span class="cart-product__price"> ${normalPrice(price)} $</span>
    </div>
    <button
      class="cart-product__delete"
      aria-label="remove cart"
    ></button>
  </article>
</li>`;
};

const generateCartProduct2 = (id, img, title, price) => {
  return `
    <li class="order-modal__item">
      <article class="order-modal__product order-product" ${id}>
        <img src="${img}" alt="Notebook" class="order-product__img" />
        <div class="order-product__text">
          <h3 class="order-product__title">${title}</h3>
          <span class="order-product__price">${price}</span>
        </div>
        <button class="order-product__delete"></button>
      </article>
    </li>
  `;
};

productsBtn.forEach((el) => {
  el.closest('.product').setAttribute('data-id', randomId());
  el.addEventListener('click', (e) => {
    let self = e.currentTarget;
    let parent = self.closest('.product');
    let id = parent.dataset.id;
    let img = parent.querySelector('.image-switch__img img').getAttribute('src');
    let title = parent.querySelector('.product__title').textContent;
    let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));

    plusFullprice(priceNumber);
    printFullprice();
    // prettier-ignore
    cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
    printQuantity();
    self.disabled = true;
  });
});

cartProductsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-product__delete')) {
    deleteProducts(e.target.closest('.cart-content__item'));
  }
});

goToCart.addEventListener('click', (e) => {
  const product = cartProductsList.querySelectorAll('.cart-product');

  let fullPriceModal = fullPrice.textContent;
  let length = product.length;
  document.querySelector('.order-modal__quantity span').textContent = `${length} pics`;
  document.querySelector('.order-modal__summ span').textContent = `${fullPriceModal}`;

  product.forEach((item) => {
    let id = item.dataset.id;
    let img = item.querySelector('.cart-product__img').getAttribute('src');
    let title = item.querySelector('.cart-product__title').textContent;
    let price = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);

    let object = new Object({
      id: id,
      img: img,
      title: title,
      price: price,
    });

    array.push(object);

    goToProductList.insertAdjacentHTML('afterbegin', generateCartProduct2(id, img, title, price));
  });
});

modalBtnList.onclick = () => {
  goToProductList.classList.toggle('order-modal__list--active');
};
