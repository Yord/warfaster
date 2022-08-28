function partitionBy(slice, array) {
  var arrays = [];

  for (var i = 0; i < array.length; i += slice) {
    arrays[arrays.length] = array.slice(i, i + slice);
  }

  return arrays;
}

export { partitionBy };
