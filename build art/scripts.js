const isMobile = /iPhone|Android/i.test(navigator.userAgent);
const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent);

const body = document.querySelector('body')
const headerPhone = document.querySelector('.hide-on-menu-open')

const mobMenu = {
    wrapper: document.querySelector('.mob-menu'),
    burger: document.querySelector('.burger'),
    links: document.querySelectorAll('.mob-menu .header-menu__item'),
}

function menuToggle() {
    if(isMobile) {
        (body.style.overflowY == '') ? body.style.overflowY = 'hidden' : body.style.overflowY = ''
    }
    mobMenu.wrapper.classList.toggle('active')
    mobMenu.burger.classList.toggle('active')
}

mobMenu.burger.onclick = () => { menuToggle() }

mobMenu.links.forEach ( item => item.onclick = () => { 
    menuToggle()
 });

//sliders
const sellHits = new Swiper('.hits-carousel', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.hits-carousel__wrap .swiper-button-next',
        prevEl: '.hits-carousel__wrap .swiper-button-prev',
    },
    breakpoints: {
        768: {
            spaceBetween: 20,
        }
    }
});

const newsHits = new Swiper('.news-carousel', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.news-carousel__wrap .swiper-button-next',
        prevEl: '.news-carousel__wrap .swiper-button-prev',
    },
    breakpoints: {
        768: {
            spaceBetween: 20,
        }
    }
});

const shopsHits = new Swiper('.shops-carousel', {
    spaceBetween: 10,
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
        nextEl: '.shops-carousel__wrap .swiper-button-next',
        prevEl: '.shops-carousel__wrap .swiper-button-prev',
    },
    breakpoints: {
        710: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});

//действия с кнопками
var productBtns = document.querySelectorAll('.button--product-card'),
prodBtnWrap 

document.querySelectorAll('.toggle-active').forEach(btn => {
    btn.onclick = ()=> { 
        //общий active
        btn.classList.toggle('active')

        //для продуктовых карточек
        if(btn.classList.contains('button--product-card')) {
            prodBtnWrap = btn.closest('.product-card__order')
            prodBtnWrap.classList.add('bottom-fixed')
        }
    }

    
});

//плюс и минус в инпутах карт товара + всякие фиксы инпутов
var field

function changeQuantity(button) {
    field = button.closest('.product-card__input').querySelector('.input--product-card')

    if(field.value == ''){
        field.value = 0
    } 
    else if(button.classList.contains('minus') && 1 <= field.value && field.value <= 200 ) {
        field.value = parseInt(field.value) - 1
    } 
    else if(button.classList.contains('plus') && 0 <= field.value && field.value < 200) {
            field.value = parseInt(field.value) + 1
    }
}

function maxLenght(el) {
    if (el.value.length > 4) {
        el.value = el.value.slice(0,3); 
    }
    else if (el.value > 200) {
        el.value = 200
    }
}
