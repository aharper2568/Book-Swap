
  const compareValues= function (a, b) {
    if (a === b) {
      return true;
    } else {
      return false
    }
  }

console.log(compareValues(1,1))
console.log(compareValues(1,2))
module.exports= { compareValues }