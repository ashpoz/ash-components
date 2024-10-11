class EventTrigger extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'detail', 'trigger'];
  
  }
  connectedCallback() {
    if (!this.getAttribute('name')) return

    const event = new CustomEvent(this.getAttribute('name'), {
      detail: this.getAttribute('detail') ?? null,
    });

    if (!this.querySelector(this.getAttribute(trigger))) return 

    this.querySelector(this.getAttribute(trigger)).addEventListener('click', () => {
      window.dispatchEvent(event)
    })

  }  
}

customElements.define('ash-event-trigger', EventTrigger)
