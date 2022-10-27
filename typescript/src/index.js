var variables;
(function (variables) {
    variables[variables["a"] = 1] = "a";
    variables[variables["b"] = 2] = "b";
    variables[variables["c"] = 3] = "c";
    variables[variables["d"] = 4] = "d";
})(variables || (variables = {}));
;
var x = variables.c;
console.log(x);
