class EventTrigger extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'detail', 'trigger'];
  
  }
  connectedCallback() {
    if (!this.getAttribute('name')) return

    const detail = this.getAttribute('detail') ?? null

    try {
      const detailJSON = JSON.parse(detail)
      const event = new CustomEvent(this.getAttribute('name'), {
        detail: detailJSON ?? null,
      });
  
      if (!this.querySelector(this.getAttribute('trigger'))) return 
  
      this.querySelector(this.getAttribute('trigger')).addEventListener('click', () => {
        document.dispatchEvent(event)
      })
    } catch (error) {
      console.error('The detail attribute expects a valid JSON string.', error)
    }
  }  
}

customElements.define('ash-event-trigger', EventTrigger)
