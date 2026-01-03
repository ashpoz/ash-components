export class Tabs extends HTMLElement {
  constructor() {
    super()
    this._currentIndex = 0
    // this.tablist = this.querySelector('ash-tablist')
    // this.tabs = this.querySelectorAll('ash-tab')
    // this.panels = this.querySelectorAll('ash-tabpanel')
  }

  static get observedAttributes() {
    return ['selected-index']
  }

  get tablist() {
    return this.querySelector('ash-tablist')
  }

  get tabs() {
    return [...this.querySelectorAll('ash-tab')]
  }

  get panels() {
    return [...this.querySelectorAll('ash-tabpanel')]
  }

  connectedCallback() {
    const selectedIndex = Number(this.getAttribute('selected-index')) || 0
    this._syncTabsAndPanels()
    this.clearTabs()
    this.showTab(selectedIndex)
    this.addEventListener('click', e => this._handleClick(e))

    console.log(this.panels)
  }

  disconnectedCallback() {

  }

  clearTabs() {
    this.panels.forEach(panel => panel.hidden = true)
  }

  showTab(index) {

    this.clearTabs()
    this.panels[index].hidden = false

    this.tabs.forEach((tab, i) => {
      const panel = this.panels[i]
      const isSelected = i === index

      if (isSelected) {
        tab.setAttribute('selected', '')
        panel.setAttribute('selected', '')
      } else {
        tab.removeAttribute('selected', '')
        panel.removeAttribute('selected', '')
      }
    })

    this._currentIndex = index
    this.setAttribute('selected-index', index)
  }

  _syncTabsAndPanels() {
    if (!this.id) {
      const randomString = Math.random().toString(36).substring(2, 9)
      this.id = `tabs-${randomString}`
    }

    this.tabs.forEach((tab, index) => {
      const panel = this.panels[index]

      if (!tab.id) tab.id = `${this.id}-tab-${index}`
      if (!panel.id) panel.id = `${this.id}-panel-${index}`

      tab.setAttribute('aria-controls', panel.id)
      panel.setAttribute('aria-labelledby', tab.id)
    })
  }

  _handleClick(e) {
    const tab = e.target.closest('ash-tab')
    const index = this.tabs.indexOf(tab)

    if (!tab) return
    if (index == -1) return

    this.showTab(index)
  }

  // showTab(activePanel) {
  //   this.panels.forEach(panel => {
  //     if (activePanel === panel) {
  //       const activeTab = this.querySelector(`#${panel.getAttribute('aria-labelledby')}`)
  //       panel.hidden = false
  //       activeTab.ariaSelected = true
  //       activeTab.removeAttribute('tabindex')
  //     } else {
  //       const activeTab = this.querySelector(`#${panel.getAttribute('aria-labelledby')}`)
  //       panel.hidden = true
  //       activeTab.ariaSelected = false
  //       activeTab.setAttribute('tabindex', '-1')
  //     }
  //   })
  // }

  // connectedCallback() {
  //   this.showTab(this.panels[this.currentIndex])

  //   this.tablist.addEventListener('click', e => {
  //     const clickedTab = e.target.closest('ash-tab')
  //     this.currentIndex = [...clickedTab.parentElement.children].indexOf(clickedTab)
  //     const activeTabPanel = this.panels[this.currentIndex]

  //     if (!activeTabPanel) return

  //     console.log(e.target)

  //     e.target.removeAttribute('tabindex')
  //     this.showTab(activeTabPanel)
  //   })

  //   this.tabs.forEach(tab => { 
  //     tab.setAttribute('tabindex', '-1')
  //   })

  //   this.panels.forEach(tab => { 
  //     tab.setAttribute('tabindex', '-1')
  //   })

  //   this.tabs[this.currentIndex].removeAttribute('tabindex')

  //   this.tablist.addEventListener('keydown', e => {
  //     if (e.which === 40) {
  //       // down
  //       this.panels[this.currentIndex].focus()
  //     }
  //     if (e.which === 37 && this.currentIndex !== 0) {
  //       // left
  //       this.currentIndex--
  //       this.tabs[this.currentIndex].focus()
  //       this.showTab(this.panels[this.currentIndex])
  //     }
  //     if (e.which === 39 && this.currentIndex < this.tabs.length - 1) {
  //       // right
  //       this.currentIndex++
  //       this.tabs[this.currentIndex].focus()
  //       this.showTab(this.panels[this.currentIndex])
  //     }
  //   })
  // }  
}