import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();

    let carouselButton = this.elem.querySelectorAll(".carousel__button");
    // carouselButton.addEventListener("click", this.onClick);
    carouselButton.forEach((btn) => {
      btn.addEventListener("click", this.onClick);
    });
    // this.id = carouselButton.closest(".carousel__slide").dataset.id;
    
    this.slidesNumber = this.elem.querySelectorAll(".carousel__slide").length;
    this.position = 0;
    this.caruselInner = this.elem.querySelector(".carousel__inner");

    this.carouselArrowPrev = this.elem.querySelector(".carousel__arrow_left");
    this.carouselArrowPrev.addEventListener("click", this.onClickArrowPrev);

    this.carouselArrowNext = this.elem.querySelector(".carousel__arrow_right");
    this.carouselArrowNext.addEventListener("click", this.onClickArrowNext);

    this.carouselArrowPrev.style.display = "none";
  }

  render() {
    let carousel = `<div class="carousel">
                      <div class="carousel__arrow carousel__arrow_right">
                        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                      </div>
                      <div class="carousel__arrow carousel__arrow_left">
                        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
                      </div>
                      <div class="carousel__inner">`;
    this.slides.map((slide) => {
      carousel += `<div class="carousel__slide" data-id="${slide.id}">
                    <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                      <div class="carousel__title">${slide.name}</div>
                      <button type="button" class="carousel__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                    </div>
                  </div>`;
    });
    carousel += "</div></div>";
    this.elem = createElement(carousel);
  }

  onClick = (btn) => {
    let index = (this.elem.offsetWidth - this.position) / this.elem.offsetWidth - 1;
    let customEvent = new CustomEvent("product-add", {
      detail: this.slides[index].id,
      bubbles: true,
    });

    this.elem.dispatchEvent(customEvent);
  };

  onClickArrowPrev = () => {
    this.position += this.widthOneSlide;
    this.caruselInner.style.transform = `translateX(${this.position}px)`;
    if (this.position == 0) {
      this.carouselArrowPrev.style.display = "none";
    } else {
      this.carouselArrowPrev.style.display = "";
      this.carouselArrowNext.style.display = "";
    }
  }

  onClickArrowNext = () => {
    this.widthOneSlide =
      this.elem.offsetWidth;
    this.position = this.position - this.widthOneSlide;
    this.caruselInner.style.transform = `translateX(${this.position}px)`;
    if (this.position == 0 - this.widthOneSlide * (this.slidesNumber - 1)) {
      this.carouselArrowNext.style.display = "none";
    } else {
      this.carouselArrowNext.style.display = "";
      this.carouselArrowPrev.style.display = "";
    }
  }
}
