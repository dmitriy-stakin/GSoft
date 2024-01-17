var leaves = document.querySelectorAll('.leaves')

if(!isMobile) {
    window.addEventListener('scroll', () => {
        let { scrollY } = window;
        leaves.forEach(leave => {
                leave.style.translate = '0 ' + 0.2 * scrollY + 'px';
        });
    }) 
}