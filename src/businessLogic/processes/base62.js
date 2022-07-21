const digitsBase62 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function toBase62(n) {
  if (n === 0) return "0";
  var result = "";
  while (n > 0) {
    result = digitsBase62[n % digitsBase62.length] + result;
    n = parseInt(n / digitsBase62.length, 10);
  }
  return result;
}

function fromBase62(s) {
  var result = 0;
  for (var i = 0; i < s.length; i++) {
    var p = digitsBase62.indexOf(s[i]);
    if (p < 0) return NaN;
    result += p * Math.pow(digitsBase62.length, s.length - i - 1);
  }
  return result;
}

export { fromBase62, toBase62 };
