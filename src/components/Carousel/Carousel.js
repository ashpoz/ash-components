class Carousel extends HTMLElement {
  constructor() {
    super()
    this.currentIndex = 0
    this.slides = document.querySelectorAll('ash-carousel-slide')
  }

  scrollToSlide(index) {
    if (!this.slides) return
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;
    
    this.slides[index].scrollIntoView({
      behavior: 'smooth',
      inline: 'start'
    });
    
    this.currentIndex = index;
  }

  connectedCallback() {
    const navigationHTML = `
    <nav>
      <button data-carousel-direction='prev'>Previous</button>
      <button data-carousel-direction='next'>Next</button>
    </nav>
    `
    this.insertAdjacentHTML('beforeend', navigationHTML)

    this.querySelector('nav').addEventListener('click', e => {
      if (e.target.dataset.carouselDirection === 'prev') {
        this.scrollToSlide(this.currentIndex - 1)
      }
      if (e.target.dataset.carouselDirection === 'next') {
        this.scrollToSlide(this.currentIndex + 1)
      }
    })
  }  
}

customElements.define('ash-carousel', Carousel)
