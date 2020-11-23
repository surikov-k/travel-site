class Modal {
  constructor() {
    this.injectHtml();
    this.modal = document.querySelector(`.modal`);
    // this.openModalButtons = document.querySelectorAll(`.open-modal`);
    this.closeModalBtn = document.querySelector(`.modal__close`);
    this.events();
  }

  events() {
    // this.openModalButtons.forEach((btn) => btn.addEventListener(`click`, (e) => this.openModal(e)));
    this.closeModalBtn.addEventListener(`click`, () => this.closeModal());
    document.addEventListener(`keyup`, (e) => this.keyPressHandler(e));
  }

  openModal(e) {
    // e.preventDefault();
    this.modal.classList.add(`modal--is-visible`);
  }

  closeModal() {
    this.modal.classList.remove(`modal--is-visible`);
  }

  keyPressHandler(e) {
    if (e.keyCode === 27) {
      this.closeModal();
    }
  }

  injectHtml() {
    const html = `  <div class="modal">
    <div class="modal__inner">
      <h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg" class="section-title__icon"> Get in <strong>Touch</strong></h2>
      <div class="wrapper wrapper--narrow">
        <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
      </div>

      <div class="social-icons">
        <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
        <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
        <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
        <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
      </div>
    </div>
    <div class="modal__close">X</div>
  </div>`;
    document.body.insertAdjacentHTML(`beforeend`, html);
  }
}

export default Modal;
