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
    headerPhone.classList.toggle('vis-hidden')
    mobMenu.wrapper.classList.toggle('active')
    mobMenu.burger.classList.toggle('active')
}

mobMenu.burger.onclick = () => { menuToggle() }

mobMenu.links.forEach ( item => item.onclick = () => { 
    menuToggle()
});


// функционал попапов
function Popup ( openBtns, container ) {
    this.container = container,
    this.openBtns = openBtns,
    this.background = container.querySelector('.popup__background'),
    this.content = container.querySelector('.popup__container'),
    this.closeBtns = container.querySelectorAll('.popup__close')

    this.openBtns.forEach( button => {
        button.onclick = () => {
            this.container.classList.add('popup-active')
        }

        this.background.addEventListener('click', listenOutsideClick = (e) => {
            const withinBoundaries = e.composedPath().includes(this.content);
            if ( ! withinBoundaries ) {
                this.container.classList.remove('popup-active')
                this.background.removeEventListener('click', listenOutsideClick);
            }
        })
    })

    this.closeBtns.forEach( button => {
        button.onclick = () => {
            this.container.classList.remove('popup-active')
        }
    })
}

var popupBtns = document.querySelectorAll('.open-popup')
var popupContainer = document.querySelector('.recall-popup')
var contactPopup = new Popup( popupBtns, popupContainer )

//анимации блоков
const animSections = document.querySelectorAll('.scroll-anim')
function checkAnime(sections) {
    sections.forEach( section => {
        if (!section.classList.contains('animate')) {
            if( window.innerHeight - section.getBoundingClientRect().top > window.innerHeight / 4  ) {
                section.classList.add('animate')
            }
        }
    } )
}

checkAnime(animSections)

//header + check анимации блоков
const darkSections = document.querySelectorAll('.section-dark')

document.addEventListener('scroll', () => {
    ( window.scrollY > 0 ) ? document.querySelector('.header').classList.add('scrolling') : document.querySelector('.header').classList.remove('scrolling')
    darkSections.forEach(section => {
        if(section.getBoundingClientRect().top < 5) {
            document.querySelector('.header').classList.add('dark');
        } 
        if (section.getBoundingClientRect().bottom <= 5) {
            document.querySelector('.header').classList.remove('dark')
        }
    })

    checkAnime(animSections)
})

var forms = document.querySelectorAll('form')
forms.forEach( form => {
    form.onsubmit = () => {
        form.querySelector('.form-submit').setAttribute('disabled', true)
    }
})
