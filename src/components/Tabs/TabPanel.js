export class TabPanel extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel')
  }
}

