const isMobile = /iPhone|Android/i.test(navigator.userAgent),
      isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent),
      body = document.querySelector('body')

//смена стилей шапки
const darkSections = document.querySelectorAll('.section-dark')

document.addEventListener('scroll', () => {
    ( window.scrollY > 0 ) ? document.querySelector('.header').classList.add('scrolling') : document.querySelector('.header').classList.remove('scrolling')
    if(darkSections) {
        darkSections.forEach(section => {
            if(section.getBoundingClientRect().top < 5) {
                document.querySelector('.header').classList.add('dark');
            } 
            if (section.getBoundingClientRect().bottom <= 5) {
                document.querySelector('.header').classList.remove('dark')
            }
        })
    }
})

const mobMenu = {
    wrapper: document.querySelector('.mob-menu'),
    burger: document.querySelectorAll('.burger-button'),
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

let headerSearch = document.querySelector('#header-search'), 
    searchWrap = headerSearch.closest('.header-input__wrap'),
    searchResult = document.querySelector('.search-results')

headerSearch.oninput = ()=> {
    searchResult.classList.add('active')
    searchWrap.classList.add('iconless')
    if (headerSearch.value == '') {
        searchResult.classList.remove('active')
        searchWrap.classList.remove('iconless')
    }
}

function specifyLocation(btn) {
    btn.nextElementSibling.classList.toggle('active')
}
function closeLocation(btn) {
    btn.closest('.header-city_popup').classList.remove('active')
}

//действия с кнопками
var productBtns = document.querySelectorAll('.button--product-card'),
prodBtnWrap 

document.querySelectorAll('.toggle-active').forEach(btn => {
    btn.onclick = ()=> {
        //для продуктовых карточек
        if(btn.classList.contains('button--product-card')) {
            prodBtnWrap = btn.closest('.product-card__order')
            prodBtnWrap.classList.add('active')
        }

        //для адресов
        // if(btn.classList.contains('account-address')) {
        //     btn.closest('.account-addresses').querySelectorAll('.account-address').forEach(address => {
        //         address.classList.remove('active')
        //     })
        // }

        //общий active
        btn.classList.toggle('active')
    }
});

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
        prodBtnWrap.classList.remove('active')
        button.closest('.product-card__input').previousElementSibling.classList.remove('active')
    } 
}

let value
function maxLenght(el) {
    value = el.value
    if (value.length > 4) {
        el.value = value.slice(0,3); 
    }
    else if (value > 200) {
        el.value = 200
    }
    else if (value < 0) {
        el.value = 0
    }
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
            body.classList.add('body-hidden')

            this.background.addEventListener('click', listenOutsideClick = (e) => {
                var withinBoundaries = e.composedPath().includes(this.content);
                if ( ! withinBoundaries ) {
                    this.container.classList.remove('popup-active')
                    body.classList.remove('body-hidden')
    
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
            body.classList.remove('body-hidden')
        }
    })
    }
}
let popupBtns, popupContainer

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
                if(this.section.classList.contains('to-top')){
                    this.section.classList.remove('to-top')
                } else if (this.section.classList.contains('popup-active')) {
                    this.section.classList.remove('popup-active')
                    setTimeout(()=> {
                        body.classList.remove('body-hidden')
                    }, 100)
                }
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
let swipeToggler, swipeSection