function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      if (j == 3) {
        if (table.rows[i].cells[j].hasAttribute('data-available')) {
          console.log(1);
          if (table.rows[i].cells[j].dataset.available == "true") {
            table.rows[i].classList.add("available");
          } else {
            table.rows[i].classList.add("unavailable");
          }
        } else {
          table.rows[i].setAttribute("hidden", "");
        }
      }
      if (j == 2 && table.rows[i].cells[j].innerHTML == "m") {
        table.rows[i].classList.add("male");
      }
      if (j == 2 && table.rows[i].cells[j].innerHTML == "f") {
        table.rows[i].classList.add("female");
      }
      if (j == 1 && Number(table.rows[i].cells[j].innerHTML) < 18) {
        table.rows[i].style.textDecoration = "line-through";
      }
    }
  }
}
