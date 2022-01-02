function initCarousel() {
  let widthOneSlide = document.querySelectorAll(".carousel__slide")[0].offsetWidth;
  let slidesNumber = document.querySelectorAll(".carousel__slide").length;
  let caruselInner = document.querySelector(".carousel__inner");
  let carouselArrowPrev = document.querySelector(".carousel__arrow_left");
  let carouselArrowNext = document.querySelector(".carousel__arrow_right");
  carouselArrowPrev.style.display = "none";
  let position = 0;
  console.log(widthOneSlide, slidesNumber);
  carouselArrowNext.addEventListener("click", () => {
    position = position - widthOneSlide;
    caruselInner.style.transform = `translateX(${ position }px)`;
    console.log(position);
    if (position == 0 - widthOneSlide * (slidesNumber - 1)) {
      carouselArrowNext.style.display = "none";
    } else {
      carouselArrowNext.style.display = "";
      carouselArrowPrev.style.display = "";
    }
  });
  carouselArrowPrev.addEventListener("click", () => {
    position = position + widthOneSlide;
    caruselInner.style.transform = `translateX(${ position }px)`;
    console.log(position);
    if (position == 0) {
      carouselArrowPrev.style.display = "none";
    } else {
      carouselArrowPrev.style.display = "";
      carouselArrowNext.style.display = "";
    }
  });
}
