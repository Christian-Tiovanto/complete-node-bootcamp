// console.log(arguments);
// console.log(require("module").wrapper);

const C = require("./test-modules-1");
const calc1 = new C();
console.log(calc1.add(5, 8));

// const calc2 = require("./test-module-2");
// console.log(calc2.multiply(5, 8));

const { add, multiply, divide } = require("./test-module-2"); //since exports return a object, we can use destructuring
console.log(multiply(5, 8));
require("./tet-modules-3")();
require("./tet-modules-3")();
require("./tet-modules-3")();
