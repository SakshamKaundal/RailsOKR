const person = {
  name: 'saksham',
  age: 23,
  weight: 70
}

const { name,weight, ...next} = person

console.log(name)
console.log(weight)
console.log(next)
