const storyCarousel = new Swiper('.stories-carousel', {
    spaceBetween: 4,
    slidesPerView: 'auto',
    breakpoints: {
        768: {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
        }
    }
})

const scrollTop = document.querySelector('.scroll-top')
let scrollPrev = 0

if(isMobile) {
  document.addEventListener('scroll', ()=> {
    (window.scrollY > 400) ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    scrollPrev = window.scrollY
  })
}

scrollTop.onclick = () => {
  window.scrollTo(0, 0);
}

popupBtns = document.querySelectorAll('.burger--mobile-nav'), 
popupContainer = document.querySelector('.popup--catalog-mob')
const catMobPopup = new Popup(popupBtns, popupContainer)

popupBtns = document.querySelectorAll('.story'), 
popupContainer = document.querySelector('.popup--story')
const storyPopup = new Popup(popupBtns, popupContainer)

popupBtns = document.querySelectorAll('.header-account__cart'), 
popupContainer = document.querySelector('.popup--cart')
const orderPopup = new Popup(popupBtns, popupContainer)

swipeToggler = document.querySelector('.popup--catalog-mob .swipe-toggler'),
swipeSection = document.querySelector('.popup--catalog-mob')
const addAddressSection = new SwipeSection (swipeToggler, swipeSection)

//верхнее меню на телефоне
const scrollMenu = {
    scrollTo: document.querySelectorAll('.catalog-section'),
    menuItems: document.querySelectorAll('.mobile-nav_item a'),
}

window.addEventListener('scroll', () => {
    let currentSection = null;
    scrollMenu.scrollTo.forEach(section => {
      const secTop = section.offsetTop; 
      const secHeight = section.clientHeight;
      if (window.pageYOffset >= (secTop - secHeight/.8)) {
        currentSection = section;
      }
    });
  
    let prevScroll = 0
    scrollMenu.menuItems.forEach((item, i) => {
      item.parentElement.classList.remove('active');
      if (currentSection && item.getAttribute('href') === `#${currentSection.id}`) {
        item.parentElement.classList.add('active');
        scrollMenu.menuItems.forEach((prevItem, j) => {
            if (j < i) {
                prevScroll += prevItem.parentElement.offsetWidth
                item.closest('.mobile-nav_list').scrollTo(prevScroll,0)
            } 
            else if (j == 0) {
                item.closest('.mobile-nav_list').scrollTo(0,0)
            }
        })
      }
    });
  });