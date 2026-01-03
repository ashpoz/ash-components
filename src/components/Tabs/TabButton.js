export class TabButton extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['selected']
  }

  connectedCallback() {
    const tabText = this.textContent
    this.innerHTML = `<button role="tab">${tabText}</button>`
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'selected') {
      this.setAttribute('aria-selected', newValue !== null)
      this.setAttribute('tabindex', newValue === null ? '-1' : '0')
    }
  }
}

