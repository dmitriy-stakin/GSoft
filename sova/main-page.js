const isMobile = /iPhone|Android/i.test(navigator.userAgent),
      isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent);

//смена стилей шапки
const darkSections = document.querySelectorAll('.section-dark')

document.addEventListener('scroll', () => {
    ( window.scrollY > 0 ) ? document.querySelector('.header-main').classList.add('scrolling') : document.querySelector('.header-main').classList.remove('scrolling')
    darkSections.forEach(section => {
        if(section.getBoundingClientRect().top < 5) {
            document.querySelector('.header-main').classList.add('dark');
        } 
        if (section.getBoundingClientRect().bottom <= 5) {
            document.querySelector('.header-main').classList.remove('dark')
        }
    })
})

SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime    : 600,
    // Размер шага в пикселях 
    stepSize         : 75,

    // Дополнительные настройки:
    
    // Ускорение 
    accelerationDelta : 30,  
    // Максимальное ускорение
    accelerationMax   : 2,   

    // Поддержка клавиатуры
    keyboardSupport   : true,  
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll       : 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,

    // Поддержка тачпада
    touchpadSupport   : true,
})

if(!isMobile && !isTablet) {
    //parallax
    const heroSection = document.querySelector('.hero-section')

    if (heroSection) {
        const heroImage = document.querySelectorAll('.parallax-item')

        let positionX = 0,
            positionY = 0,
            coordXpercent = 0,
            coordYpercent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXpercent - positionX,
                distY = coordYpercent - positionY;

            positionX = positionX + (distX * 0.05)
            positionY = positionY + (distY * 0.05)

            heroImage.forEach(image => {
                image.style.cssText = `transform: translate(${positionX / 50}%,${positionY / 50}%);`
            })

            requestAnimationFrame(setMouseParallaxStyle)
        }
        setMouseParallaxStyle()

        document.addEventListener('mousemove', (e)=>{
            const heroWidth = heroSection.offsetWidth
            const heroHeight = heroSection.offsetHeight

            const coordX = e.pageX - heroWidth / 2
            const coordY = e.pageY - heroHeight / 2

            coordXpercent = coordX / heroWidth * 100
            coordYpercent = coordY / heroHeight * 100
        })
    }

    let parallaxItems = document.querySelectorAll('.parallax-image')

    if(parallaxItems) {
        window.addEventListener('scroll', () => {
            let { scrollY } = window;
            parallaxItems.forEach(item => {
                item.style.translate = '0 ' + -0.1 * scrollY + 'px';
                if(item.nextElementSibling) {
                    if(item.nextElementSibling.tagName == 'IMG') {
                        item.nextElementSibling.style.translate = '0 ' + -0.05 * scrollY + 'px';
                    }
                }
            });
        }) 
    }
}