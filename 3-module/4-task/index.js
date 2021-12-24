function showSalary(users, age) {
  let str = '';
  for (let i = 0; i < users.length; i++) {
    if (users[i]['age'] <= age) {
      str += `${users[i]['name']}, ${users[i]['balance']}\n`;
    }
  }
  return str.slice(0, -1);
}
