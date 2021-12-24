function getMinMax(str) {
  let arr = str.split(' ');
  let min = 0;
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i]) && parseFloat(arr[i]) < min) {
      min = parseFloat(arr[i]);
    }
    if (!isNaN(arr[i]) && parseFloat(arr[i]) > max) {
      max = parseFloat(arr[i]);
    }
  }
  return {
    min, max
  };
}
