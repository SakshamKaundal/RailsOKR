// const person = {
//   name: "Saksham",

//   greet: function () {

//     const self = this;

//     function sayHi() {
//       console.log(self.name);
//     }

//     sayHi();
//   }
// };
// person.greet();

const person = {
  names: "Saksham kaundal",

  greet: function () {
    const sayHi = () => {
      console.log(this.names);
    }
    sayHi();
  }
};
person.greet();

