const rangeInput = document.querySelectorAll(".filter-range__wrap input"),
  priceInput = document.querySelectorAll(".price-input__field input"),
  range = document.querySelector(".filter-progress");
let priceGap = 500;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
 
//объявляем окна
openOrClose(
    document.querySelector('.catalog-filters'),
    document.querySelectorAll('.open-filters'),
    document.querySelectorAll('.catalog-filters .button--page-back')
)

const filterWindow = {
  openBtns: document.querySelectorAll('.button--filters'),
  closeBtn: '',
  mobileWindow : '',
}

filterWindow.openBtns.forEach(btn => {
  btn.onclick = () => {

    filterWindow.closeBtn = btn.closest('.filter').querySelector('.button--filter-back')
    filterWindow.mobileWindow = btn.closest('.filter').querySelector('.filter-mobile__more')

    if(filterWindow.mobileWindow) {
      filterWindow.mobileWindow.closest('.catalog-filters').classList.add('body-hidden')
      filterWindow.mobileWindow.classList.add('active')

      filterWindow.closeBtn.onclick = () => {
        filterWindow.mobileWindow.closest('.catalog-filters').classList.remove('body-hidden')
        filterWindow.mobileWindow.classList.remove('active')
      }
    }
  }
})

const headerMob = document.querySelector('.catalog-header')
const scrollTop = document.querySelector('.scroll-top')
var scrollPrev = 0

if(isMobile) {
  document.addEventListener('scroll', ()=> {
    (window.scrollY > 170 && window.scrollY > scrollPrev) ? headerMob.classList.add('active') : headerMob.classList.remove('active');
    (window.scrollY > 400) ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    scrollPrev = window.scrollY
  })
}

scrollTop.onclick = () => {
  window.scrollTo(0, 0);
}

const headerMain = document.querySelector('.header')
const headerCatalog = document.querySelector('.page-heading__wrap') 
const headerSearch = document.querySelector('.input--header-search')
function openSearchCatalog() {
  window.scrollTo(0, 0);
  headerMain.style.display = 'block'
  headerCatalog.style.display = 'none'
  headerSearch.click()
}