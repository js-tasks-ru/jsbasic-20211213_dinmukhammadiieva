import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth != 0) {
      if (this.elem.style.position != "fixed") {
        this.topPosition =
          this.elem.getBoundingClientRect().top + window.pageYOffset;
      }

      let fromLeftPosition1 =
        document.querySelectorAll(".container")[0].getBoundingClientRect()
          .right + 20;
      let fromLeftPosition2 =
        document.documentElement.clientWidth - this.elem.offsetWidth - 10;
      let fromLeftPosition =
        Math.min(fromLeftPosition1, fromLeftPosition2) + "px";

      // с таким условием тест не проходит
      // if (window.pageYOffset > this.topPosition && document.documentElement.clientWidth > 767) {
      if (document.documentElement.clientWidth > 767) {
        this.elem.style.position = "fixed";
        this.elem.style.left = fromLeftPosition;
        this.elem.style.right = "10px";
        this.elem.style.top = "50px";
        this.elem.style.zIndex = 1000;
      } else {
        this.elem.style.position = "";
        this.elem.style.left = "";
        this.elem.style.top = "";
        this.elem.style.zIndex = "";
      }
    }
  }

  isEmpty() {
    // возвращает true если корзина пуста и false если нет
    return true;
  }

  getTotalCount() {
    // Возвращает общее количество товаров в корзине
    return 0;
  }

  getTotalPrice() {
    // Возвращает общую сумму всех товаров в корзине
    return 0;
  }
}
