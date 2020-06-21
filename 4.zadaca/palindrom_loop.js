function loop_palindrome(str) {
  var re = /[^A-Za-z0-9]/g;
  str = str.toLowerCase().replace(re, "");
  var len = str.length;
  for (var i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

loop_palindrome("Ana voli milovana");
loop_palindrome("Sir ima miris");
loop_palindrome("Ovo nije palindrom");
