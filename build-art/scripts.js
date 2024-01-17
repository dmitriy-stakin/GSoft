const isMobile = /iPhone|Android/i.test(navigator.userAgent);
const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent);

const body = document.querySelector('body')
const headerPhone = document.querySelector('.hide-on-menu-open')

const mobMenu = {
    wrapper: document.querySelector('.mob-menu'),
    burger: document.querySelectorAll('.burger'),
    links: document.querySelectorAll('.mob-menu .header-menu__item'),
}

function menuToggle() {
    if(isMobile) {
        body.classList.toggle('body-hidden')
    }
    mobMenu.wrapper.classList.toggle('active')
    mobMenu.burger.forEach(burger => {
        burger.classList.toggle('active')
    })
}

mobMenu.burger.forEach( burger => burger.onclick = () => {
    menuToggle()
    })
mobMenu.links.forEach ( item => item.onclick = () => { 
    menuToggle()
});

if(document.querySelector('.additional-products')) {
    const additionalSlider = new Swiper('.additional-products', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.additional-products__wrap .swiper-button-next',
            prevEl: '.additional-products__wrap .swiper-button-prev',
        },
        breakpoints: {
            768: {
                spaceBetween: 20,
            }
        }
    })
}

// функционал попапов
function Popup ( openBtns, container ) {
    if (container) {
        this.container = container,
        this.background = container.querySelector('.popup__background'),
        this.content = container.querySelector('.popup__boundary'),

        this.openBtns = openBtns,
        this.closeBtns = container.querySelectorAll('.popup__close'),

        this.steps = container.querySelectorAll('.step'),
        this.nextSteps = container.querySelectorAll('.nextStep'),
        this.prevSteps = container.querySelectorAll('.prevStep')

        this.currentStep = 1

    if(this.prevSteps.length > 0) {
        this.prevSteps.forEach (step => {
            step.onclick = ()=> {
                this.prevStepsHandler()
            }
        })
    }
    if(this.nextSteps.length > 0) {
        this.nextSteps.forEach (step => {
            step.onclick = ()=> {
                this.nextStepsHandler()
            }
        })
    }

    this.prevStepsHandler = function () {
        this.currentStep -= 1
        this.toggleStep()
    }
    this.nextStepsHandler = function () {
        this.currentStep += 1
        this.toggleStep()
    }

    this.toggleStep = function() {
        if(this.steps.length > 0) {
            this.steps.forEach(step => {
                step.classList.add('step_hide')
                if(step.dataset.step == this.currentStep) step.classList.toggle('step_hide')
            })
        }
    }

    this.openBtns.forEach( button => {
        button.onclick = () => {
            document.querySelectorAll('.popup-active').forEach(popup=>{
                popup.classList.remove('popup-active')
            })
            this.container.classList.add('popup-active')

            this.background.addEventListener('click', listenOutsideClick = (e) => {
                var withinBoundaries = e.composedPath().includes(this.content);
                if ( ! withinBoundaries ) {
                    this.container.classList.remove('popup-active')
    
                    this.currentStep = 1
                    this.toggleStep()
    
                    this.background.removeEventListener('click', listenOutsideClick);
                }
            })
        }
    })

    this.closeBtns.forEach( button => {
        button.onclick = () => {
            this.currentStep = 1
            this.toggleStep()

            this.container.classList.remove('popup-active')
        }
    })
    }
}

//Активация попапов в хедере + меню попап-каталога
var menuPopupWraps = document.querySelectorAll( '.menu-popup__wrap'),
    catBtnsWrap = document.querySelector('.catalog-buttons__wrap'),
    menuPopupContent

// function removeActive() {
//     if(catBtnsWrap.classList.contains('active')) {
//         catBtnsWrap.classList.remove('active')
//         document.querySelector('.has-submenu.active').remove('active')
//     }
// }

function openHeaderPopup (btn) {
    btn.classList.toggle('active')

    switch (true) {
        case btn.classList.contains('open-catalog'):
            document.querySelector('.catalog-popup__wrap').classList.toggle('active')
            break;
        case btn.classList.contains('input--header-search'):
            document.querySelector('.search-popup__wrap').classList.add('active')
            document.querySelector('.catalog-buttons__wrap').classList.add('active')
            if (mobMenu.wrapper.classList.contains('active')) {
                menuToggle()
            }
            break;
    }

    menuPopupWraps.forEach( wrap => {
        menuPopupContent = wrap.querySelector('.menu-popup')
        wrap.querySelector('.popup-overlay').addEventListener( 'click', (e) => {
            const withinBoundaries = e.composedPath().includes(menuPopupContent)
            
            if ( ! withinBoundaries ) {
                wrap.classList.remove('active') 
                catBtnsWrap.classList.remove('active')
                if(wrap.classList.contains('catalog-popup__wrap')) {
                    document.querySelectorAll('.open-catalog').forEach(button => {
                        button.classList.remove('active')
                    })
                }
            }
        })
    })

}

var catalogActive,
    searchActive,
    catalogSubCat

function closePopupSubmenu (btn) {

    catalogActive = document.querySelector('.catalog-popup__wrap.active')
    searchActive = document.querySelector('.search-popup__wrap.active')
    catalogSubCat = document.querySelector('.has-submenu.active')

    if (catalogSubCat) {
        catalogSubCat.classList.remove('active')
    } 
    else if (catalogActive) {
        catalogActive.classList.remove('active')
        document.querySelector('.open-catalog.active').classList.remove('active')
    }

    if (searchActive) {
        searchActive.classList.remove('active')
        if(document.querySelector('.page-heading__wrap')) {
            headerMain.style.display = 'none'
            headerCatalog.style.display = 'flex'
        }
    }

    if (!btn.classList.contains('button-back-secondary')) {
        btn.closest('.catalog-buttons__wrap').classList.remove('active')
    }
}

var menuItems = document.querySelectorAll('.catalog-popup__item.has-submenu')

menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        menuItems.forEach(lastItem => {
            lastItem.classList.remove('active')

            item.classList.add('active')
            document.querySelector('.catalog-buttons__wrap').classList.add('active')
        })
    })
})
//переменные задаём единожды, потом перезаписываем
var popupBtns = document.querySelectorAll('.account-login'), 
    popupContainer = document.querySelector('.login-popup')
const loginPopup = new Popup(popupBtns, popupContainer)

//login-pin-code
document.querySelectorAll('.login-confirm').forEach( field => {
    field.addEventListener('keydown', (event) => {
        event.preventDefault()
        if(event.key == 'Backspace') {
            field.value = ''
            if (field.previousElementSibling) field.previousElementSibling.focus()
            return
        }
        if (isNaN(+event.key)) { 
            field.value = field.value;
            return;
        }
        field.value = event.key
        if(field.nextElementSibling) field.nextElementSibling.focus()
    })
} )

popupBtns = document.querySelectorAll('.choose-city'),
popupContainer = document.querySelector('.address-popup')
const addressPopup = new Popup(popupBtns, popupContainer)

popupBtns = document.querySelectorAll('.set-address'),
popupContainer = document.querySelector('.location-popup')
const locationPopup = new Popup(popupBtns, popupContainer)

popupBtns = document.querySelectorAll('.page-heading__more'),
popupContainer = document.querySelector('.review-popup')
const reviewPopup = new Popup(popupBtns, popupContainer)

popupBtns = document.querySelectorAll('.take-off-open'),
popupContainer = document.querySelector('.take-off-popup')
const takeOffPopup = new Popup(popupBtns, popupContainer)

const cityField = document.querySelector('.popup__city-name')
var citiesNames = document.querySelectorAll('.popup__city')

if (cityField) {
    cityField.onclick = ()=>{
        cityField.classList.toggle('active')
        citiesNames.forEach(city=>{
            city.classList.remove('current')
            if (cityField.innerHTML === city.innerHTML) {
                city.classList.add('current')
            }
            city.onclick = ()=>{
                cityField.innerHTML = city.innerHTML
                cityField.classList.remove('active')
            }
        })
    }
}

function SwipeSection(toggler, section) {
    if(section) {
        this.toggler = toggler,
        this.section = section,
        this.content = this.section.querySelector('.swipe-content'),

        this.firstTouch,
        this.yDown = null,
        this.yDiff,

        this.toggler.addEventListener('touchstart', handleTouchStart = (evt) => {
            this.yDown = evt.touches[0].pageY;
        }, {passive: true});

        this.toggler.addEventListener('touchmove', handleTouchMove = (evt) => {
            if ( ! this.yDown ) {
                return;
            }
            this.yDiff = this.yDown - evt.touches[0].pageY;
                                                                                
            if ( this.yDiff > 0 ) {
                this.section.classList.add('to-top')
            } else {
                this.section.classList.remove('to-top')
            }                                              
            /* reset values */
            this.yDown = null;
        }, {passive: true});

        if( this.content ) {
            this.content.onclick = ()=>{
                this.section.classList.add('to-top')
            }
        }
    }
}

//переменные задаём единожды, потом перезаписываем
var swipeToggler = document.querySelector('.add-address .swipe-toggler'),
    swipeSection = document.querySelector('.add-address__form')
const addAddressSection = new SwipeSection (swipeToggler, swipeSection)

function detectSwipeX(elements) {

    var touchstart = 0
    var touchend = 0

    function checkDirection(element) {
        if ((touchend - touchstart) < -45) element.classList.add('moved')
        if ((touchend - touchstart) > 45) element.classList.remove('moved')
    }

    elements.forEach(el => {
        el.addEventListener('touchstart', ev => {
            touchstart = ev.changedTouches[0].screenX
          }, {passive: true})
          
        el.addEventListener('touchend', ev => {
            touchend = ev.changedTouches[0].screenX
            checkDirection(el)
        }, {passive: true})
})
}

detectSwipeX(document.querySelectorAll('.can-delete .account-address'))

const takeOffMobile = {
    buttonShow: document.querySelector('.take-off .show-map'),
    map: document.querySelector('.take-off__map'),
    content: document.querySelector('.take-off__content'),
    swipeToggler: document.querySelectorAll('.take-off__content .swipe-toggler')
}

swipeToggler = document.querySelector('.take-out__toggler'),
swipeSection = document.querySelector('.take-off__content')
const takeOutSection = new SwipeSection(swipeToggler, swipeSection)

if(takeOffMobile.buttonShow) {
    takeOffMobile.buttonShow.onclick = ()=>{
        takeOffMobile.content.classList.remove('to-top')
    }
}

//действия с кнопками
var productBtns = document.querySelectorAll('.button--product-card'),
prodBtnWrap 

document.querySelectorAll('.toggle-active').forEach(btn => {
    btn.onclick = ()=> {
        //для продуктовых карточек
        if(btn.classList.contains('button--product-card')) {
            prodBtnWrap = btn.closest('.product-card__order')
            prodBtnWrap.classList.add('bottom-fixed')
        }

        //для адресов
        if(btn.classList.contains('account-address')) {
            btn.closest('.account-addresses').querySelectorAll('.account-address').forEach(address => {
                address.classList.remove('active')
            })
        }

        //общий active
        btn.classList.toggle('active')
    }
});

//новое действие с кнопками
function openOrClose(container, openBtn, closeBtn) {
    openBtn.forEach(btn => {
        btn.onclick = ()=>{
            container.classList.add('active')
            body.classList.add('body-hidden')
        }
    });
    
    closeBtn.forEach(btn => {
        btn.onclick = ()=>{
            container.classList.remove('active')
            body.classList.remove('body-hidden')
        }
    });
    
}

//плюс и минус в инпутах карт товара + всякие фиксы инпутов
var field

function changeQuantity(button) {
    field = button.closest('.product-card__input').querySelector('.input--product-card')
    if(field.value == ''){
        field.value = 1
    } 
    else if(button.classList.contains('minus') && 1 <= field.value && field.value <= 200 ) {
        field.value = parseInt(field.value) - 1
    } 
    else if(button.classList.contains('plus') && 0 <= field.value && field.value < 200) {
            field.value = parseInt(field.value) + 1
    }
    if(field.value == '0'){
        if (document.querySelector('.quantity-popup.popup-active')) {
            document.querySelector('.quantity-popup').classList.remove('popup-active')
        }
        button.closest('.product-card__input').previousElementSibling.classList.remove('active')
        if (button.parentNode.classList.contains('.product-card__order'))
        button.closest('.product-card__order').classList.remove('bottom-fixed')
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

const reviewInputs = document.querySelector('.rate-extra-inputs')
var rateText = document.querySelector('.review-popup .popup__subheading')
document.querySelectorAll('.star-input label').forEach(label => {
    label.onclick = ()=> {
        switch(label.getAttribute('for')) {
            case('rating-5'):
            reviewInputs.style.display='none'
            rateText.innerHTML = 'Рады, что вам всё понравилось!'
            break;
            case('rating-4'):
            reviewInputs.style.display='block'
            rateText.innerHTML = 'Вы поставили четыре звезды. Что мы можем улучшить?'
            break;
            case('rating-3'):
            reviewInputs.style.display='block'
            rateText.innerHTML = 'Вы поставили три звезды. Что вам не понравилось?'
            break;
            case('rating-2'):
            reviewInputs.style.display='block'
            rateText.innerHTML = 'Вы поставили две звезды. Так плохо?'
            break;
            case('rating-1'):
            reviewInputs.style.display='block'
            rateText.innerHTML = 'Вы поставили кол. Я что, на уроке информатики???'
            break;
        }
    }
})
