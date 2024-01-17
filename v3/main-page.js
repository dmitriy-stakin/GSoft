//заголовки у карточек
if(isMobile) {
    var cards = document.querySelectorAll('.advantage.overlay-card')

    document.addEventListener('scroll', () => {
        cards.forEach(card => {
            var styles = getComputedStyle(card)
            var offsetTop = card.getBoundingClientRect().top
            if (card.previousElementSibling) {
                var cardPrev = card.previousElementSibling
            }
            if (cardPrev) {
                if ( parseInt(styles.top) >= offsetTop) {
                    cardPrev.classList.add('show-header')
                } else {
                    cardPrev.classList.remove('show-header')
                }
            }
        });
    })
}

//phone tilt
const phoneTilt = document.querySelectorAll('.phone-image');
if(!isMobile && !isTablet) {
    VanillaTilt.init(phoneTilt, {
        reverse: true,
        "full-page-listening":  true,
        axis: 'x',
        max: 20,
        speed: 300,
    });
}

//слайдеры
$('.slick-dots li').append($('.dot-circle'))

const circleAnim = anime ({
    targets: '.nav-container .dot-circle',
    strokeDashoffset: 250,
    duration: 10200,
    easing: 'linear',
})

$('.slider').on('touchstart', () => {
    circleAnim.restart()
    $('.slider').slick('slickPlay')
});

$('.slider').on('beforeChange', function(){
    circleAnim.restart()
});

document.querySelectorAll('.arrow-container').forEach( btn => {
    btn.onclick = () => {
        btn.classList.remove('anime')
        void btn.offsetWidth;
        btn.classList.add('anime')
    }
})

// $('.cases').slick({
//     infinite: false,
//     arrows: false,
//     dots: false,
//     swipeToSlide: false,
//     variableWidth: false,
//     pauseOnHover: false,
//     pauseOnFocus: false,
//     pauseOnDotsHover: false,
//     mobileFirst: true,
//     responsive: [{
//         breakpoint: 769,
//         settings: {
//             swipeToSlide: true,
//             variableWidth: true,
//         }
//     }],
// });

//полоса при скролле
var scrollSection = {
    wraps: document.querySelectorAll('.scroll-block'),
    tracks: document.querySelector('.scroll-inner')
 },
 startY
 
var supScrollCheck, scrollLenght

 document.addEventListener("scroll", () => {
     scrollSection.wraps.forEach(wrap => {
         fixedTop = wrap.getBoundingClientRect().top
         startY = fixedTop - window.innerHeight / 2
         scrollLenght = 100 - Math.abs(startY / 6)
         if (startY < 0) {
            if (scrollLenght > -20) {
                wrap.querySelector('.scroll-inner').style.bottom = scrollLenght.toFixed(2) + '%';
            }
            else {
                wrap.querySelector('.scroll-inner').style.bottom = '-1%';
            }
             wrap.querySelector('.scroll-dot').classList.add('active')
             if (wrap.querySelector('.scroll-dot.end')){
                if(scrollLenght < 0) {
                    wrap.querySelector('.scroll-dot.end').classList.add('active')
                }
                else {
                    wrap.querySelector('.scroll-dot.end').classList.remove('active')
                }
             }
         }
         else {
            wrap.querySelector('.scroll-inner').style.bottom = '100%';
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
    if(scrollCheck2 > 2960 ) { 
        scroll.inner.className = "";
        scroll.inner.classList.add('integrations-scroll')
    } else if(scrollCheck2 > 2300) {
        scroll.inner.className = "";
        scroll.inner.classList.add('qr-scroll')
    } else if(scrollCheck2 > 1645) {
        scroll.inner.className = "";
        scroll.inner.classList.add('reviews-scroll')
    } else if(scrollCheck2 > 1050) {
        scroll.inner.className = "";
        scroll.inner.classList.add('presents-scroll')
    } else if(scrollCheck2 > 420) {
        scroll.inner.className = "";
        scroll.inner.classList.add('loyalty-scroll')
    } else {
        scroll.inner.className = "";
        scroll.inner.classList.add('delivery-scroll')
    }
})

// crm система
var tabsButtons, tabsContent

function Tab(buttons, content) {
    this.buttons = buttons;
    this.content = content;
    this.lastClicked = this.buttons[0];

    this.buttons.forEach ( (tab, i) => tab.onclick = () => {
        this.lastClicked.classList.remove('active')
        tab.classList.add('active')
    
        this.lastClicked = tab;
    
        this.content.forEach (function (cont) {
            ( cont.getAttribute('tab-order') == i ) ? cont.classList.add('active') : cont.classList.remove('active')
        })
    
    } )
}

tabsButtons = document.querySelectorAll('.crm-tab')
tabsContent = document.querySelectorAll('.crm-image')
var crmTabs = new Tab(tabsButtons, tabsContent)

//crm btn
var crmMenuBtn = document.querySelector('.button--crm-menu')
var menuCloseBtns = document.querySelectorAll('.crm-tab .crm-btn')

crmMenuBtn.onclick = () => {
    crmMenuBtn.classList.toggle('active')

    menuCloseBtns.forEach( btn => {
        if(btn.innerHTML == crmMenuBtn.innerHTML) {
            btn.style.display="none"
        }
        else {
            btn.style.display="block"
        }
    })
}

menuCloseBtns.forEach( btn => {
    btn.onclick = () => {
        crmMenuBtn.classList.remove('active')
        crmMenuBtn.innerHTML = btn.innerHTML
    }
})

// тарифы (пока отключены...:( )
// tabsButtons = document.querySelectorAll('.price-button')
// tabsContent = document.querySelectorAll('.price-list')
// var ratesTabs = new Tabs(tabsButtons, tabsContent)