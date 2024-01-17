var tabsButtons, tabsContent

function Tab(buttons, content) {
    this.buttons = buttons;
    this.content = content;
    this.lastClicked = this.buttons[0];

    this.buttons.forEach ( (tab, i) => tab.onclick = () => {
        this.lastClicked.classList.remove('active')
        tab.classList.add('active')
    
        this.lastClicked = tab;
    
        this.content.forEach (function (cont) {
            ( cont.getAttribute('tab-order') == i ) ? cont.classList.add('active') : cont.classList.remove('active')
        })
    
    } )
}

tabsButtons = document.querySelectorAll('.shop-item')
tabsContent = document.querySelectorAll('.shops-map__image')
mapTabs = new Tab(tabsButtons, tabsContent)