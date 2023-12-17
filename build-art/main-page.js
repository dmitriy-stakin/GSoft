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