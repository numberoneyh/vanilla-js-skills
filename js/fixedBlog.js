const fixedBlog = document.querySelector('.filters-price'),
  filters = document.querySelector('.filters'),
  container = document.querySelector('.container'),
  offsetLeft = container.offsetLeft + 15,
  filtersWidth = filters.offsetWidth,
  filtersOffsetTop = filters.offsetTop,
  smallOffset = 20;

// fixed blog
const fixedScrollBlog = () => {
  let scrollDistance = window.scrollY;

  if (scrollDistance > filtersOffsetTop - smallOffset && scrollDistance <= filters.offsetHeight + filtersOffsetTop) {
    fixedBlog.style.left = `${offsetLeft}px`;
    fixedBlog.style.width = `${filtersWidth}px`;
    fixedBlog.classList.remove('filters-price--absolute');
    fixedBlog.classList.add('filters-price--fixed');
  } else {
    fixedBlog.style.left = null;
    fixedBlog.style.width = `100%`;
    fixedBlog.classList.remove('filters-price--fixed');
  }

  if (scrollDistance >= filtersOffsetTop - smallOffset + filters.offsetHeight - fixedBlog.offsetHeight) {
    fixedBlog.style.width = `100%`;
    fixedBlog.classList.remove('filters-price--fixed');
    fixedBlog.style.left = null;
    fixedBlog.classList.add('filters-price--absolute');
  }
};

window.addEventListener('scroll', fixedScrollBlog);
