
  const compareValues= function (a, b) {
    return a !== b;
  }

console.log(compareValues(1,1))
console.log(compareValues(1,2))
module.exports= { compareValues }