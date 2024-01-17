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