import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {
  constructor() {
    this.pageSections = document.querySelectorAll(`.page-section`);
    this.siteHeader = document.querySelector(`.site-header`);
    this.browserHeight = window.innerHeight;
    this.previousScrollY = window.scrollY;
    this.events();
  }

  events() {
    window.addEventListener(`scroll`, throttle(() => this.runOnScroll(), 200));
    window.addEventListener(`resize`, debounce(() => this.browserHeight = window.innerHeight, 333));
  }

  runOnScroll() {
    this.determineScrollDirection();

    if (window.scrollY > 60) {
      this.siteHeader.classList.add(`site-header--dark`);
    } else {
      this.siteHeader.classList.remove(`site-header--dark`);
    }

    this.pageSections.forEach(section => this.calcSection(section));
  }

  calcSection(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop
      && window.scrollY < el.offsetTop + el.offsetHeight) {

      const scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100;

      if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection === `down` ||
        scrollPercent < 33 && this.scrollDirection === `up`) {

        const matchingLink = el.getAttribute(`data-mutching-link`);

        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`)
          .forEach((link) => link.classList.remove(`is-current-link`));

        document.querySelector(matchingLink).classList.add(`is-current-link`);
      }
    }
  }

  determineScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = `down`;
    } else {
      this.scrollDirection = `up`;
    }
    this.previousScrollY = window.scrollY;
  }
}
export default StickyHeader;
