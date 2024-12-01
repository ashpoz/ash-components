export class TabList extends HTMLElement {
  connectedCallback() {
    if (this.hasAttribute('role')) return

    this.setAttribute('role', 'tablist')
  }
}

