/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.render(rows);

    let button = this.elem.querySelectorAll("table button");

    button.forEach(btn => {
      btn.addEventListener("click", this.onClick);
    });
  }
  render(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML += "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead><tbody>";
    rows.forEach((row) => {
      this.elem.innerHTML += `<tr>
                  <td>${row.name}</td>
                  <td>${row.age}</td>
                  <td>${row.salary}</td>
                  <td>${row.city}</td>
                  <td><button>X</button></td>
                </tr>`;
    });
    this.elem.innerHTML += "</tbody>";
  }
  onClick() {
    this.closest("tr").remove();
  }
}
