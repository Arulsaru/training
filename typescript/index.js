console.log('hello world');
var age = 21;
if (age < 50) {
    age += 10;
}
var user = [1, "Kavi"];
var employee = {
    id: 1001,
    name: 'Kavi',
    retire: function (date) {
        console.log(date);
    }
};
//union types
function kgToLbs(weight) {
    if (typeof weight === 'number') {
        return weight * 2.2;
    }
    else
        return parseInt(weight) * 2.2;
}
kgToLbs(10);
kgToLbs('10kg');
var textBox = {
    drag: function () { },
    resize: function () { }
};
var quantity = 100;
//nullable types
function greet(name) {
    if (name) {
        console.log(name.toLocaleUpperCase());
    }
    else {
        console.log('Hola!');
    }
}
greet(undefined);
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
var customer = getCustomer(1);
// if(customer!==null && customer!==undefined)
//     console.log(customer.birthday);
console.log(customer === null || customer === void 0 ? void 0 : customer.birthday);
