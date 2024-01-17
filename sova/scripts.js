const isMobile = /iPhone|Android/i.test(navigator.userAgent),
      isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent);

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
        // if(btn.classList.contains('button--product-card')) {
        //     prodBtnWrap = btn.closest('.product-card__order')
        //     prodBtnWrap.classList.add('bottom-fixed')
        // }

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
        if (document.querySelector('.quantity-popup.popup-active')) {
            document.querySelector('.quantity-popup').classList.remove('popup-active')
        }
        button.closest('.product-card__input').previousElementSibling.classList.remove('active')
        if (button.parentNode.classList.contains('.product-card__order'))
        button.closest('.product-card__order').classList.remove('bottom-fixed')
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