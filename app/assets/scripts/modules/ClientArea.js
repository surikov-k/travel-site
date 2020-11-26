import Axios from 'axios';

class ClientArea {
  constructor() {
    this.injectHTML();
    this.form = document.querySelector(`.client-area__form`);
    this.field = this.form.querySelector(`.client-area__input`);
    this.contentArea = document.querySelector(`.client-area__content-area`);
    this.events();
  }

  events() {
    this.form.addEventListener(`submit`, (e) => {
      e.preventDefault();
      this.sendRequest();
    });
  }

  sendRequest() {
    Axios.post(`https://thirsty-kilby-1d0d92.netlify.app/.netlify/functions/secret-area`, {
      password: this.field.value
    })
      .then((response) => {
        this.form.remove();
        this.contentArea.innerHTML = response.data;
      })
      .catch(() => {
        this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again</p>`;
        this.field.value = ``;
        this.field.focus();
      });
  }

  injectHTML() {
    document.body.insertAdjacentHTML(`beforeend`, `
          <div class="client-area">
      <div class="wrapper wrapper__medium">
        <h2 class="section-title section-title--blue">
          Secret Client Area
        </h2>
        <form action="" class="client-area__form">
          <input type="text" class="client-area__input" placeholder="Enter the secret phrase">
          <button class="btn btn--orange">Submit</button>
        </form>
        <div class="client-area__content-area"></div>
      </div>
    </div>
    `);
  }
}

export default ClientArea;
