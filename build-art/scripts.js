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

//Активация попапов в хедере + меню попап-каталога
var menuPopupWraps = document.querySelectorAll( '.menu-popup__wrap'),
menuPopupContent

function openHeaderPopup (btn) {
    btn.classList.toggle('active')

    var cls = btn.classList
    switch (true) {
        case cls.contains('open-catalog'):
            document.querySelector('.search-popup__wrap').classList.remove('active')
            document.querySelector('.catalog-popup__wrap').classList.toggle('active')
            break;
        case cls.contains('input--header-search'):
            document.querySelector('.catalog-popup__wrap').classList.remove('active')
            document.querySelector('.search-popup__wrap').classList.add('active')
            document.querySelector('.catalog-buttons__wrap').classList.add('active')
            break;
    }

    menuPopupWraps.forEach( wrap => {
        menuPopupContent = wrap.querySelector('.menu-popup')
        wrap.querySelector('.menu-popup__overlay').addEventListener( 'click', (e) => {
            const withinBoundaries = e.composedPath().includes(menuPopupContent)
            
            if ( ! withinBoundaries ) {
                wrap.classList.remove('active') 
            }
        })
    })

}

function closePopupSubmenu (btn) {
    document.querySelector('.catalog-popup__item.active').classList.remove('active')
    btn.closest('.catalog-buttons__wrap').classList.remove('active')
}

var menuItems = Array.from(document.querySelectorAll('.catalog-popup__item')),
prevItem

menuItems.forEach(item => {
    item.addEventListener('mouseover', (event) => {
        if(event.relatedTarget = item) {
            menuItems.forEach(lastItem => {
                lastItem.classList.remove('active')
            })
            item.classList.add('active')
            document.querySelector('.catalog-buttons__wrap').classList.add('active')
        }
    })
})

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
