function getCount(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (/[aeiuo]/.test(str[i])) count++;
  }
  return count;
}