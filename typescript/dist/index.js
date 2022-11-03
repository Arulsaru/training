"use strict";
var variables;
(function (variables) {
    variables[variables["a"] = 1] = "a";
    variables[variables["b"] = 2] = "b";
    variables[variables["c"] = 3] = "c";
    variables[variables["d"] = 4] = "d";
})(variables || (variables = {}));
;
let x = variables.c;
console.log(x);
const user = [1, 'hai', true];
user.push('hello');
console.log(user);
function calcValue(var1, var2 = 20) {
    if (var1 <= 10 && var2 <= 10)
        return var1 + var2;
    return var1 - var2;
}
console.log(calcValue(30));
let employee1 = {
    name: 'hari',
    emp_id: 11,
    email: 'hari@gmail.com'
};
const employee2 = {
    name: 'Arul',
    emp_id: 21,
    email: 'arul@gmail.com'
};
function calckg(weight) {
    if (typeof weight === 'number')
        return weight * 2;
    else
        return parseInt(weight) * 3;
}
console.log(calckg(10));
const calc = {
    sum1: () => { },
    sub1: () => { }
};
