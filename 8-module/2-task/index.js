import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
                                <div class="products-grid__inner">
                                  <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
                                </div>
                              </div>`);

    this.products.forEach((product) => {
      let card = new ProductCard(product);
      this.elem.querySelector(".products-grid__inner").append(card.elem);
    });
  }

  renderCards() {
    this.elem.querySelector(".products-grid__inner").innerHTML = "";

    for (let product of this.products) {
      // console.log(this.filters.noNuts && product.nuts, 
      //   this.filters.vegeterianOnly && !product.vegeterian,
      //   product.spiciness > this.filters.maxSpiciness,
      //   product.category != this.filters.category && this.filters.category);
      if (this.filters.noNuts && product.nuts) {
        continue;
      }
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }
      if (product.spiciness > this.filters.maxSpiciness) {
        continue;
      }
      if (product.category != this.filters.category && this.filters.category) {
        continue;
      }
      let card = new ProductCard(product);
      this.elem.querySelector(".products-grid__inner").append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderCards();
  }
}
