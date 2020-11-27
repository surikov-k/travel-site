import '../styles/styles.css';
import 'lazysizes';
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
import ClientArea from './modules/ClientArea';

import React from 'react';
import ReactDOM from 'react-dom';

import MyComponent from './modules/MyComponent';

ReactDOM.render(<MyComponent/>, document.querySelector(`#my-react-example`));

// import Modal from './modules/Modal';
if (module.hot) {
  module.hot.accept();
}

const mobileMenu = new MobileMenu();
let modal;
new RevealOnScroll(document.querySelectorAll(`.feature-item`), 75);
new RevealOnScroll(document.querySelectorAll(`.testimonial`), 60);
new ClientArea();
new StickyHeader();
// new Modal();

document.querySelectorAll(`.open-modal`)
  .forEach((el) => el.addEventListener(`click`, (e) => {
    e.preventDefault();
    if (typeof modal == "undefined") {
      import(/* webpackChunkName: "modal" */ './modules/Modal').then((x) => {
        modal = new x.default();
        setTimeout(() => modal.openModal(), 20)
      }).catch(() => console.log(`There was a problem.`));
    } else {
      modal.openModal();
    }
  }));
