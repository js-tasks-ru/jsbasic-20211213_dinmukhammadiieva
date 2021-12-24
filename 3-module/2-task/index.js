function filterRange(arr, a, b) {
  let array = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= a && arr[i] <= b) {
      array.push(arr[i]);
    }
  }
  return array;
}
