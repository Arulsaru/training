"use strict";
console.log('Helloc');
const infos = ['girish', 'ganga', 'yatrik', 'Ganesh', 'Ravi', 'Guna'];
const subInfos = infos.slice(1, 4);
subInfos.forEach(item => {
    printDatas(item);
});
function printDatas(item) {
    console.log(item);
}
subInfos.splice(2, 2);
console.log(subInfos);
const alphabets = ['alpha', true, 'gamma', 5];
var rectangle;
(function (rectangle) {
    rectangle[rectangle["length"] = 2] = "length";
    rectangle[rectangle["width"] = 3] = "width";
    rectangle[rectangle["breadth"] = 4] = "breadth";
})(rectangle || (rectangle = {}));
var triangle;
(function (triangle) {
    triangle[triangle["base"] = 39] = "base";
    triangle[triangle["height"] = 40] = "height";
})(triangle || (triangle = {}));
const obj = rectangle.breadth;
console.log(obj);
const triango = triangle.height;
console.log(triango);
const k = gst(45, 5);
console.log(k);
function gst(sales, goods) {
    return sales * goods;
}
union('hari');
union(100);
function union(randomType) {
    if (typeof randomType === 'number') {
        console.log('It is a number');
    }
    else {
        console.log('It is a string');
    }
}
const sample = {
    model: 'Dx40',
    name: 'polo',
    year: 2018,
};
const sample1 = {
    model: 'DD500',
    name: 'Tiago',
    year: 2019,
    milage: 20
};
