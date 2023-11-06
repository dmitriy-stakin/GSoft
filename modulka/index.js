var menuBtn = document.querySelector('.burger')

menuBtn.onclick = () => {
    document.querySelector('.header-phone').classList.toggle('hidden')
    menuBtn.classList.toggle('active')
    document.querySelector('.mob-menu').classList.toggle('active')
}