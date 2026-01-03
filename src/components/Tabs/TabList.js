export class TabList extends HTMLElement {
  constructor() {
    super()
  }
  get tabs() {
    return [...this.querySelectorAll('ash-tab')]
  }

  #selectTab(tab) {
    tab.setAttribute('aria-selected', true)
    tab.setAttribute('tabindex', 0)
  }

  #deselectTab(tab) {
    tab.setAttribute('aria-selected', false)
    tab.setAttribute('tabindex', -1)
  }

  #deselectAllTabs() {
    this.tabs.forEach(this.#deselectTab)
  }

  #handleButtonClicks() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', event => {
        this.#deselectAllTabs()
        this.#selectTab(event.target)
      })
    })
  }

  connectedCallback() {
    // TODO: do I need this?
    // if (this.hasAttribute('role')) return

    this.setAttribute('role', 'tablist')

    this.#handleButtonClicks()
  }
}

