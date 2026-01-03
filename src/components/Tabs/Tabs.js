export class Tabs extends HTMLElement {
  constructor() {
    super()
    this.currentIndex = 0
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
    this.#syncTabsAndPanels()
    this.clearTabs()
    this.showTab(selectedIndex)
    this.addEventListener('click', e => this.#handleClick(e))
    this.#handleKeyboardActions()
  }

  disconnectedCallback() {

  }

  clearTabs() {
    this.panels.forEach(panel => panel.hidden = true)
  }

  showTab(index) {

    this.clearTabs()

    const showTabEvent = new CustomEvent('showtab', {
      detail: {
        index,
      },
    })

    this.dispatchEvent(showTabEvent)

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

    this.currentIndex = index
    this.setAttribute('selected-index', index)
  }

  #syncTabsAndPanels() {
    if (!this.id) {
      const uuid = crypto.randomUUID()
      this.id = `tabs-${uuid}`
    }

    this.tabs.forEach((tab, index) => {
      const panel = this.panels[index]

      if (!tab.id) tab.id = `${this.id}-tab-${index}`
      if (!panel.id) panel.id = `${this.id}-panel-${index}`

      tab.setAttribute('aria-controls', panel.id)
      panel.setAttribute('aria-labelledby', tab.id)
    })
  }

  #handleClick(e) {
    const tab = e.target.closest('ash-tab')
    const index = this.tabs.indexOf(tab)

    if (!tab) return
    if (index == -1) return

    this.showTab(index)
  }

  #handleKeyboardActions(e) {
    this.tablist.addEventListener('keydown', e => {
      console.log(this.panels)
      console.log(this.currentIndex)
      if (e.which === 40) {
        // down
        this.panels[this.currentIndex].focus()
      }
      if (e.which === 37 && this.currentIndex !== 0) {
        // left
        this.currentIndex--
        this.tabs[this.currentIndex].focus()
        this.showTab(this.currentIndex)
      }
      if (e.which === 39 && this.currentIndex < this.tabs.length - 1) {
        // right
        this.currentIndex++
        this.tabs[this.currentIndex].focus()
        this.showTab(this.currentIndex)
      }
    })
  }
}