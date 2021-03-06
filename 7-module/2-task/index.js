import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();

    this.modalClose = this.elem.querySelector(".modal__close");
    this.modalClose.addEventListener("click", this.close);

    document.addEventListener("keydown", (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    });
  }

  render() {
    this.elem = createElement(`<div class="modal">
                                <!--Прозрачная подложка перекрывающая интерфейс-->
                                <div class="modal__overlay"></div>

                                <div class="modal__inner">
                                  <div class="modal__header">
                                    <!--Кнопка закрытия модального окна-->
                                    <button type="button" class="modal__close">
                                      <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
                                    </button>

                                    <h3 class="modal__title">
                                    </h3>
                                  </div>
                                </div>

                              </div>`);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  }

  setTitle(str) {
    this.elem.querySelector(".modal__title").innerHTML = str;
  }

  setBody(str) {
    let modalBody = document.createElement('div');
    modalBody.classList.add("modal__body");
    modalBody.append(str);
    if (this.elem.querySelector(".modal__body")) {
      this.elem.querySelector(".modal__body").remove();
    }
    this.elem.querySelector(".modal__inner").append(modalBody);
  }

  close = () => {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
    document.removeEventListener('keydown', this.close, false);
  }
}
