var body = document.querySelector('body')

function closeMenu() {
    document.querySelector('.header-phone').classList.toggle('hidden')
    document.querySelector('.burger').classList.toggle('active')
    document.querySelector('.mob-menu').classList.toggle('active');
    (body.style.overflowY == '') ? body.style.overflowY = 'hidden' : body.style.overflowY = ''
}

document.querySelector('.burger').onclick = () => { closeMenu() }

document.querySelectorAll('.mob-menu .header-menu-item a').forEach ( item => item.onclick = () => { closeMenu() })

//карусели (эмоциональные мои)

var articleSlider = document.querySelector('#articles .carousel'),
    articleTrack = document.querySelector('#articles .carousel-track'),
    articleSliderItems = 5,

    casesSlider = document.querySelector('#cases .carousel'),
    casesTrack = document.querySelector('#cases .carousel-track'),
    casesSliderItems = 3

function setSliderWidthHeight( slider, itemsNumber ) {
    if(window.screen.width > 1024){
        slider.style.width = (slider.querySelector('.carousel-item').offsetWidth + 20) * itemsNumber-1 + 'px'
    }
    slider.style.height = slider.querySelector('.carousel-item').offsetHeight + 20 + 'px'
}

var innerSlider,
    pressed = false,
    startX,
    x;

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
        let outer = document.querySelector('.container').getBoundingClientRect();
        let inner = innerSlider.getBoundingClientRect();
    
        if (parseInt(innerSlider.style.left) > 0) {
            innerSlider.style.left = "0px";
        }
    
        if (inner.right < outer.right) {
            innerSlider.style.left = `-${inner.width - outer.width + 40}px`;
        }
    };
}

if(articleSlider) {
    setSliderWidthHeight(articleSlider, articleSliderItems)
    createSlider(articleSlider, articleTrack)
}

if(casesSlider) {
    setSliderWidthHeight(casesSlider, casesSliderItems)
    createSlider(casesSlider, casesTrack)
}