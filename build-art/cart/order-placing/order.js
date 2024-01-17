popupBtns = document.querySelectorAll('.to-order'),
popupContainer = document.querySelector('.order-popup')
const orderPopup = new Popup(popupBtns,popupContainer)

document.querySelector('.order-pay').onclick = () => {
    document.querySelector('.order-accepted').classList.add('active')
}
document.querySelector('.order-refuse').onclick = () => {
    document.querySelector('.order-declined').classList.add('active')
}