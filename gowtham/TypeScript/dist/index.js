"use strict";
let a = 10;
console.log(a);
//Arrays
const users = [];
users.push('hari');
users.push('arul');
users.push('keerthi');
// users.push(1)
const index = users.indexOf('hari');
users.splice(index, 1);
console.log(users);
//Tuples
let employees;
employees = [1, 'hari', true, { DoorNo: 101, Street: 'abc', City: 'cbe' }];
employees.push('hi! hello');
console.log(employees);
let address = {
    DoorNo: 101,
    Street: 'abc',
    City: 'cbe',
    retire: (date) => {
        console.log(date);
    }
    // Pincode: 641062
};
console.log(address.Pincode);
//enum
var Directions;
(function (Directions) {
    Directions[Directions["East"] = 1] = "East";
    Directions[Directions["West"] = 2] = "West";
    Directions[Directions["North"] = 3] = "North";
    Directions[Directions["South"] = 4] = "South";
})(Directions || (Directions = {}));
console.log(Directions);
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["Success"] = 200] = "Success";
    StatusCodes[StatusCodes["Accepted"] = 202] = "Accepted";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
})(StatusCodes || (StatusCodes = {}));
console.log(StatusCodes.Accepted);
//Union
dolToInr(10);
dolToInr('10$');
function dolToInr(currency) {
    if (typeof currency === 'number') {
        console.log(currency * 82.36);
        return currency * 82.36;
    }
    else {
        console.log(parseInt(currency) * 82.36);
        return parseInt(currency) * 82.36;
    }
}
//# sourceMappingURL=index.js.map