export class TabButton extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['selected']
  }

  connectedCallback() {
    this.setAttribute('role', 'tab')
    this.setAttribute('type', 'button')
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'selected') {
      this.setAttribute('aria-selected', newValue !== null)
      this.setAttribute('tabindex', newValue === null ? '-1' : '0')
    }
  }
}

