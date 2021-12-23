let arr = [30,67,90];
// let arr2 = arr.slice(0,3)
let arr2 = [...arr]

arr2.push(100)
console.log(...arr,"Love" ,...arr2)