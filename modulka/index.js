var body = document.querySelector('body')

function closeMenu() {
    document.querySelector('.header-phone').classList.toggle('hidden')
    document.querySelector('.burger').classList.toggle('active')
    document.querySelector('.mob-menu').classList.toggle('active');
    (body.style.overflowY == '') ? body.style.overflowY = 'hidden' : body.style.overflowY = ''
}

document.querySelector('.burger').onclick = () => { closeMenu() }

document.querySelectorAll('.header-menu-item a').forEach ( item => item.onclick = () => { closeMenu() })


// слайдер (инициируется в index.html)
$('.slick-dots li').append($('.dot-circle'))

const circleAnim = anime ({
    targets: '.dot-circle',
    strokeDashoffset: 250,
    duration: 5200,
    easing: 'linear',
})

$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    circleAnim.restart()
});

var navElems = [$('.slick-dots'), $('.slick-prev'), $('.slick-next')]
var navContainer =$('.nav-container')
$.each (navElems, (i) => {
    navContainer.append(navElems[i])
})
   
  
// возможности системы
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

var capAnim = anime({
    targets: ".capability",
    translateY: [200, 0],
    opacity: [0, 1],
    easing: 'linear',
    autoplay: false,
    duration: 500,
    delay: function(el, i) { return i * 300; }
})

var played = false
document.querySelector('.anim-start').onclick = capAnim.play;


$(window).on('resize scroll', function() {
    if (played === false) {
        if ($('#about').isInViewport()) {
            document.querySelector('.anim-start').click()
            played = true
        }
    }
});

// crm система
var tabs = document.querySelectorAll('.tab')
var images = document.querySelectorAll('.tab-image')

var lastClicked = tabs[0];

tabs.forEach ( (tab, i) => tab.onclick = () => {
    lastClicked.classList.remove('active')
    tab.classList.add('active')

    lastClicked = tab;

    images.forEach (function (img) {
        ( img.getAttribute('tab-order') ==i ) ? img.classList.add('active') : img.classList.remove('active')
    })

} )

// этапы реализации
var stageClose = document.querySelectorAll('.stage-close')
var stageOpen = document.querySelectorAll('.stage-open')
var timeTrack = document.querySelector('.timeline-track')
var stages = document.querySelectorAll('.stage')
var trackDots = [...document.querySelectorAll('.stage-dot')]

var cardMinHeight
var stageButton

setTimeout(() => {
    stages.forEach( stage => stage.style.height = stage.offsetHeight + 'px' )
}, 300);

stageClose.forEach( (btn) => btn.onclick = () => { 
    btn.closest('.stage').classList.toggle('active');
 })

const userAgent = navigator.userAgent.toLowerCase();
var isMobile = /iPhone|Android/i.test(navigator.userAgent);
var isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

stageOpen.forEach( (btn, i) => btn.onclick = () => {
    
    stages.forEach((stage) => {
        if (!stage.contains(btn)) {
            stage.classList.remove('active')
        }
    });

    btn.closest('.stage').classList.toggle('active');

    cardMinHeight = btn.closest('.stage').querySelector('.stage-data').offsetHeight;
    document.documentElement.style.setProperty('--data-height', cardMinHeight + 'px')

    trackDots.forEach( dot => dot.classList.remove('active') )

    function changeTimeline(param) {
        switch (i) {
            case (0):
                timeTrack.style[param] = '16%'
                trackDots.slice(0, -3).forEach(dot => dot.classList.add('active'))
                break
            case (1):
                timeTrack.style[param] = '34%'
                trackDots.slice(0, -2).forEach(dot => dot.classList.add('active'))
                break
            case (2):
                timeTrack.style[param] = '67%'
                trackDots.slice(0, -1).forEach(dot => dot.classList.add('active'))
                break
            case (3):
                timeTrack.style[param] = '100%'
                trackDots.forEach( dot => dot.classList.add('active'))
                break
        }
    }

    if(isMobile || isTablet){
        changeTimeline('height')
    }
    else {
        changeTimeline('width')
    }
} )

var carousel = document.querySelectorAll('.carousel')
var show = [3,5]

carousel.forEach( (car, i) => {
    if(window.screen.width > 1024){
        car.style.width = (car.querySelector('.carousel-item').offsetWidth + 20) * show[i] + 'px'
    }
    car.style.height = car.querySelector('.carousel-item').offsetHeight + 20 + 'px'
})

var postSlider = document.querySelector('#posts .carousel'),
    postTrack = document.querySelector('#posts .carousel-track'),
    casesSlider = document.querySelector('#cases .carousel'),
    casesTrack = document.querySelector('#cases .carousel-track'),
    innerSlider,
    pressed = false,
    startX,
    x;

createSlider(postSlider, postTrack);
createSlider(casesSlider, casesTrack);

function createSlider ( sliderContainer, innerSlider ) {
    sliderContainer.addEventListener("mousedown", (e) => {
        pressed = true;
        startX = e.offsetX - innerSlider.offsetLeft;
        sliderContainer.style.cursor = "grabbing";
    });
    
    sliderContainer.addEventListener("mouseenter", () => {
        sliderContainer.style.cursor = "grab";
    });
    
    sliderContainer.addEventListener("mouseup", () => {
        sliderContainer.style.cursor = "grab";
        pressed = false;
    });
    
    sliderContainer.addEventListener("mousemove", (e) => {
        if (!pressed) return;
        e.preventDefault();
    
        x = e.offsetX;
    
        innerSlider.style.left = `${x - startX}px`;
        checkBoundary();
    });
    
    const checkBoundary = () => {
        let outer = sliderContainer.getBoundingClientRect();
        let inner = innerSlider.getBoundingClientRect();

        let test = document.querySelector('.container').getBoundingClientRect()
        console.log(test + 'test')
        console.log(document.querySelector('.container'))
    
        if (parseInt(innerSlider.style.left) > 0) {
            innerSlider.style.left = "0px";
        }
    
        if (inner.right < test.right) {
            innerSlider.style.left = `-${inner.width - test.width + 40}px`;
            // `-${inner.width - outer.width}px`
        }
    };
}

$('.phone-image').tilt({
    disableAxis: 'x'
})