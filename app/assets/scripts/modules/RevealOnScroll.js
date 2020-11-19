import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
  constructor(items, threshold) {
    this.itmesToReveal = items;
    this.threshold = threshold;
    this.browswerHeight = window.innerHeight;
    this.hideInitialy();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener(`scroll`, this.scrollThrottle);
    window.addEventListener(`resize`, debounce(() => this.browswerHeight = window.innerHeight), 333);
  }



  calcCaller() {
    this.itmesToReveal.forEach(el => {
      if (!el.isRevealed) {
        this.calculatedIfScrolledTo(el);
      }
    });
  }

  hideInitialy() {
    this.itmesToReveal.forEach(el => {
      el.classList.add(`reveal-item`);
      el.isRevealed = false;
    });
    this.itmesToReveal[this.itmesToReveal.length - 1].isLastItem = true;
  }

  calculatedIfScrolledTo(el) {
    if (window.scrollY + this.browswerHeight > el.offsetTop) {
      const scrollPercent = el.getBoundingClientRect().y / this.browswerHeight * 100;
      if (scrollPercent < this.threshold) {
        el.classList.add(`reveal-item--is-visible`);
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener(`scroll`, this.scrollThrottle);
        }
      }
    }
  }
}

export default RevealOnScroll;
