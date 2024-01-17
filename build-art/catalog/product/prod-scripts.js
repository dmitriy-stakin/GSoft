const prodImgThumbs = new Swiper ('.prod-image__thumbs', {
    slidesPerView: 4,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        direction: "vertical",
      }
    }
}) 

const prodImg = new Swiper ('.prod-image__carousel', {
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    thumbs: {
        swiper: prodImgThumbs,
    },
    navigation: {
        nextEl: ".product-arrow-next",
        prevEl: ".product-arrow-prev",
    },
    pagination: {
      el: '.product-pagination',
      type: 'bullets',
    },
    breakpoints: {
      1024: {
        direction: "vertical",
        autoplay: {
          enabled: false,
        },
      }
    }
}) 

popupBtns = document.querySelectorAll('.buy-btn__wrap .button--product-card'),
popupContainer = document.querySelector('.quantity-popup')
const quantityPopup = new Popup(popupBtns, popupContainer)
