function factorial(n) {
  let m = 1;
  if (n == 0) {
    return m;
  }
  for (let i = 1; i <= n; i++) {
    m *= i;
  }
  return m;
}
