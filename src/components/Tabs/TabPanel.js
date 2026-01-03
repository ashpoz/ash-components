export class TabPanel extends HTMLElement {
  constructor() {
    super()
  }

  get tabs() {
    return this.closest('ash-tabs')
  }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel')

    this.tabs.addEventListener('showtab', e => {
      console.log(e.detail.index)
    })

    console.log(this.tabs)
  }
}

