class Tabs extends HTMLElement {
  constructor() {
    super()
    this.currentIndex = 0
    this.tablist = this.querySelector('[role="tablist"]')
    this.panels = this.querySelectorAll('[role="tabpanel"]')
  }

  showTab(activePanel) {
    this.panels.forEach(tab => {
      if (activePanel === tab) {
        tab.hidden = false
        tab.ariaSelected = true
      } else {
        tab.hidden = true
        tab.ariaSelected = false
      }
    })
  }

  connectedCallback() {
    this.tablist.addEventListener('click', e => {
      const clickedTab = e.target.closest('li');
      const clickedTabIndex = [...clickedTab.parentElement.children].indexOf(clickedTab)
      const activeTabPanel = this.panels[clickedTabIndex]

      if (!activeTabPanel) return

      this.showTab(activeTabPanel)
    })

    // TODO: configure this next!
    this.tablist.addEventListener('keydown', e => {
      if (e.which === 40) {
        // down
      }
      if (e.which === 37) {
        // left
      }
      if (e.which === 39) {
        // right
      }
    })
  }  
}

customElements.define('ash-tabs', Tabs)
