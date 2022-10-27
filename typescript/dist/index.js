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
