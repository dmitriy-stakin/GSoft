const body = document.querySelector('body')
const headerPhone = document.querySelector('.header-phone')

var mobMenu = {
    wrapper: document.querySelector('.mob-menu'),
    burger: document.querySelector('.burger'),
    links: document.querySelectorAll('.mob-menu .header-menu-item a'),
}

function closeMenu() {
    (body.style.overflowY == '') ? body.style.overflowY = 'hidden' : body.style.overflowY = ''
    headerPhone.classList.toggle('hidden')
    mobMenu.wrapper.classList.toggle('active')
    mobMenu.burger.classList.toggle('active')
}

mobMenu.burger.onclick = () => { closeMenu() }

mobMenu.links.forEach ( item => item.onclick = () => { closeMenu() })

var targets = []
const colorChange = anime({
    targets: '.color-changing',
    keyframes:[
        {color: '#71D78F', fill: '#71D78F'},
        {color: '#77D7FE', fill: '#77D7FE'},
        {color: '#FFBB56', fill: '#FFBB56'},
        {color: '#D7B2FF', fill: '#D7B2FF'},
        {color: '#FF8D8B', fill: '#FF8D8B'},
    ],
    duration: 10000,
    direction: 'alternate',
    loop: true,
})

var isMobile = /iPhone|Android/i.test(navigator.userAgent);
var isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent);

const phoneTilt = document.querySelectorAll('.phone-image');
if(!isMobile && !isTablet) {
    VanillaTilt.init(phoneTilt, {
        "full-page-listening":  true,
        axis: 'x',
        max: 20,
        speed: 300,
    });
}

//слайдеры
$('.cases-carousel-mob').slick({
    infinite: true,
    arrows: true,
    swipeToSlide: false,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    dots: true,
    mobileFirst: true,
    responsive: [{
        breakpoint: 769,
        settings: {
            arrows: false,
            autoplay: false,
            infinite: false,
            swipeToSlide: true,
            variableWidth: true,
        }
    }],
});

$('.article-carousel').slick({
    arrows: false,
    infinite: false,
    swipeToSlide: false,
    variableWidth: true,
    mobileFirst: true,
    responsive: [{
        breakpoint: 768,
        settings: {
            swipeToSlide: true,
        }
    }],
})

$('.slick-dots li').append($('.dot-circle'))

const circleAnim = anime ({
    targets: '.slider .dot-circle',
    strokeDashoffset: 250,
    duration: 5200,
    easing: 'linear',
})

$('.slider').on('touchstart', e => {
    circleAnim.restart()
    $('.slider').slick('slickPlay')
});

$('.slider').on('beforeChange', function(){
    circleAnim.restart()
});

$('.slider').on('afterChange', function(){
    var el = this.querySelector('.slick-active .slide')
    var phone = $('.slider-image-main .phone-image')

    phone.css( 'background-image', 'url(' + $(el).attr('desktop-image') + ')' )
});

const circleAnim2 = anime ({
    targets: '.cases-carousel-mob .dot-circle',
    strokeDashoffset: 250,
    duration: 5200,
    easing: 'linear',
})

$('.cases-carousel-mob').on('touchstart', e => {
    circleAnim2.restart()
    $('.cases-carousel-mob').slick('slickPlay')
});

$('.cases-carousel-mob').on('beforeChange', function(){
    circleAnim2.restart()
});

var navElems = [$('.slider-wrap .slick-dots'), $('.slider-wrap .slick-prev'), $('.slider-wrap .slick-next')]
var navContainer = $('.nav-container')

$.each (navElems, (i) => {
    navContainer.append(navElems[i])
})

//полоса при скролле
var scrollSection = {
   wraps: document.querySelectorAll('.scroll-block'),
   tracks: document.querySelector('.scroll-inner')
},
startY

document.addEventListener("scroll", () => {
    scrollSection.wraps.forEach(wrap => {
        fixedTop = wrap.getBoundingClientRect().top
        startY = fixedTop - window.innerHeight / 2
        if (startY < 0 ) {
            wrap.querySelector('.scroll-inner').style.height = Math.trunc(Math.abs(startY / 6.5)) + '%';
            wrap.querySelector('.scroll-dot').classList.add('active')
            if (wrap.querySelector('.scroll-dot.end')){
                wrap.querySelector('.scroll-dot.end').classList.add('active')
            }
        }
        else {
            wrap.querySelector('.scroll-dot').classList.remove('active')
            if(wrap.querySelector('.scroll-dot.end')){
                wrap.querySelector('.scroll-dot.end').classList.remove('active')
            }
        }
    });
})


//смена телефонов при скролле
var scroll = {
    line: document.querySelector('.scroll-line'),
    container: document.querySelector('.scrolling-phone'),
    inner: document.querySelector('.scrolling-phone > div'),
}, 
scrollCheck2 

document.addEventListener("scroll", () => {
    scrollCheck2 = Math.abs(scroll.line.offsetTop - scroll.container.offsetTop)
    if(scrollCheck2 > 2345) {
        scroll.inner.className = "";
        scroll.inner.classList.add('integrations-scroll')
    } else if(scrollCheck2 > 1740) {
        scroll.inner.className = "";
        scroll.inner.classList.add('qr-scroll')
    } else if(scrollCheck2 > 1125) {
        scroll.inner.className = "";
        scroll.inner.classList.add('reviews-scroll')
    } else if(scrollCheck2 > 500) {
        scroll.inner.className = "";
        scroll.inner.classList.add('loyalty-scroll')
    } else {
        scroll.inner.className = "";
        scroll.inner.classList.add('delivery-scroll')
    }
})

// crm система
var tabs = document.querySelectorAll('.crm-tab')
var images = document.querySelectorAll('.crm-image')

var lastClicked = tabs[0];

tabs.forEach ( (tab, i) => tab.onclick = () => {
    lastClicked.classList.remove('active');
    tab.classList.add('active')
    console.log('123')
    
    lastClicked = tab;
    console.log(lastClicked)

    images.forEach (function (img) {
        ( img.getAttribute('tab-order') ==i ) ? img.classList.add('active') : img.classList.remove('active')
    })

} )