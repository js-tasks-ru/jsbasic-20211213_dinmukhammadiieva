import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();

    this.elem.querySelector(".slider__thumb").style.left = 0;
    this.elem.querySelector(".slider__progress").style.width = 0;

    this.elem.addEventListener("click", this.clickSlider);
    this.elem.addEventListener("click", this.onClick);

    this.thumb = this.elem.querySelector(".slider__thumb");
    this.thumb.ondragstart = () => false;

    this.thumb.addEventListener("pointerdown", this.onPointerDownThumb);
    this.thumb.addEventListener("pointerdown", this.onClick);
  }

  render() {
    let spanElements = "";
    for (let i = 0; i < this.steps; i++) {
      if (i == this.value) {
        spanElements += '<span class="slider__step-active"></span>';
      } else {
        spanElements += "<span></span>";
      }
    }
    this.elem = createElement(`<div class="slider">
                
                  <!--Ползунок слайдера с активным значением-->
                  <div class="slider__thumb">
                    <span class="slider__value">${this.value}</span>
                  </div>
                
                  <!--Полоска слайдера-->
                  <div class="slider__progress"></div>
                
                  <!-- Шаги слайдера (вертикальные чёрточки) -->
                  <div class="slider__steps">
                    <!-- текущий выбранный шаг выделен этим классом -->
                    ${spanElements}
                  </div>
                </div>`);
  }

  changeHtml = (leftPersent) => {
    this.elem.querySelector(".slider__value").innerHTML = this.value;
    this.elem
      .querySelector(".slider__step-active")
      .classList.remove("slider__step-active");
    this.elem
      .querySelector(".slider__steps")
      .querySelectorAll("span")
      [this.value].classList.add("slider__step-active");

    this.elem.querySelector('.slider__thumb').style.left = `${leftPersent}%`;
    this.elem.querySelector('.slider__progress').style.width = `${leftPersent}%`;
  }

  clickSlider = (e) => {
    let clickPosition = e.clientX - this.elem.getBoundingClientRect().left;
    // clickPosition - x
    // this.elem.offsetWidth - this.steps - 1
    let value = (this.steps - 1) * clickPosition / this.elem.offsetWidth;
    this.value = Math.round(value);

    // this.value - x
    // this.steps - 1 - 100%
    let leftPersent = 100 * this.value / (this.steps - 1);
    this.changeHtml(leftPersent);
  }

  moveSlider = (e) => {
    let movePosition = e.clientX - this.elem.getBoundingClientRect().left;

    let leftRelative = movePosition / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    // clickPosition - x
    // this.elem.offsetWidth - this.steps - 1
    this.value = Math.round((this.steps - 1) * leftRelative);

    let leftPersent = 100 * leftRelative;
    this.changeHtml(leftPersent);
  };

  onPointerDownThumb = (e) => {
    e.preventDefault();
    this.elem.classList.add("slider_dragging");

    document.addEventListener("pointermove", this.onPointerMoveThumb);
    document.addEventListener("pointerup", this.onPointerUpThumb);

    document.addEventListener("pointermove", this.onClick);
    document.addEventListener("pointerup", this.onClick);
  };

  onPointerMoveThumb = (e) => {
    e.preventDefault();
    this.moveSlider(e);
  };

  onPointerUpThumb = () => {
    console.log(1);
    document.removeEventListener("pointermove", this.onPointerMoveThumb);
    document.removeEventListener("pointermove", this.onClick);
    // document.removeEventListener("pointerup", this.onClick);

    this.elem.classList.remove("slider_dragging");

    // this.value - x
    // this.steps - 1 - 100%
    let leftPersent = (100 * this.value) / (this.steps - 1);
    this.elem.querySelector(".slider__thumb").style.left = `${leftPersent}%`;
    this.elem.querySelector(
      ".slider__progress"
    ).style.width = `${leftPersent}%`;
  };

  onClick = () => {
    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(customEvent);
  };
}
