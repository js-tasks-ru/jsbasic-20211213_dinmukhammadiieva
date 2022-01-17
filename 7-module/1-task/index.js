import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();

    let menuItems = this.elem.querySelectorAll("a");
    menuItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (!!this.elem.querySelector(".ribbon__item_active")) {
          this.elem.querySelector(".ribbon__item_active").classList.remove("ribbon__item_active");
        }
        item.classList.add("ribbon__item_active");
        this.onClick(index);
      });
    });

    this.menuInner = this.elem.querySelector(".ribbon__inner");

    this.menuArrowPrev = this.elem.querySelector(".ribbon__arrow_left");
    this.menuArrowPrev.addEventListener("click", this.onClickArrowPrev);

    this.menuArrowNext = this.elem.querySelector(".ribbon__arrow_right");
    this.menuArrowNext.addEventListener("click", this.onClickArrowNext);
  }

  render() {
    let menu = `<div class="ribbon">
                  <button class="ribbon__arrow ribbon__arrow_left">
                    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                  </button>

                  <nav class="ribbon__inner">
                  `;
    this.categories.forEach(category => {
      menu += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
    });
    menu += `</nav>

             <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
               <img src="/assets/images/icons/angle-icon.svg" alt="icon">
             </button>
           </div>`;
    this.elem = createElement(menu);
  }

  onClickArrowPrev = () => {
    this.menuInner.scrollBy(-350, 0);
    this.menuInner.addEventListener("scroll", () => {
      let scrollRight = this.scrollWidth - this.menuInner.scrollLeft - this.clientWidth;
      if (this.menuInner.scrollLeft == 0) {
        this.menuArrowPrev.classList.remove("ribbon__arrow_visible");
      }
      if (scrollRight > 1) {
        this.menuArrowNext.classList.add("ribbon__arrow_visible");
      }
    });
  }

  onClickArrowNext = () => {
    this.menuInner.scrollBy(350, 0);

    this.scrollWidth = this.menuInner.scrollWidth;
    this.clientWidth = this.menuInner.clientWidth;

    this.menuInner.addEventListener("scroll", () => {
      let scrollRight = this.scrollWidth - this.menuInner.scrollLeft - this.clientWidth;
      if (scrollRight < 1) {
        this.menuArrowNext.classList.remove("ribbon__arrow_visible");
      }
      if (this.menuInner.scrollLeft > 0) {
        this.menuArrowPrev.classList.add("ribbon__arrow_visible");
      }
    });
  }

  onClick = (index) => {
    let customEvent = new CustomEvent('ribbon-select', {
      detail: this.categories[index].id,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  };
}
