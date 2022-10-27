let a: number = 10;
console.log(a)

//Arrays
const users: string[] = [];
users.push('hari');
users.push('arul');
users.push('keerthi');
// users.push(1)
const index = users.indexOf('hari');
users.splice(index, 1);
console.log(users);

//Tuples
let employees: [number, string, boolean, object];
employees = [1, 'hari', true, { DoorNo: 101, Street: 'abc', City: 'cbe' }];
employees.push('hi! hello');
console.log(employees);

//Objects & Aliases
type Address = { 
    readonly DoorNo: number, 
    Street: string, 
    City: string,
    retire: (date: Date) => void,
    Pincode?: number 
} 
let address: Address = {
    DoorNo: 101,
    Street: 'abc',
    City: 'cbe',
    retire: (date: Date) => {
        console.log(date);    
    }
    // Pincode: 641062
};
console.log(address.Pincode);

//enum
enum Directions {
    East = 1,
    West,
    North,
    South
}
console.log(Directions);
enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    BadRequest = 400
}
console.log(StatusCodes.Accepted);

//Union
dolToInr(10);
dolToInr('10$')
function dolToInr(currency: number | string): number {
    if(typeof currency === 'number') {
        console.log(currency * 82.36);
        return currency * 82.36;
    }
    else {
        console.log(parseInt(currency) * 82.36);
        return parseInt(currency) * 82.36;
    }
}

//intersection

//Literals
type Value = 50 | 100;
let result: Value = 100;
console.log(result);

//nullable
function print(string: string | null | undefined) {
    if(string)
        console.log(string.toUpperCase());
    else if(null) 
       console.log(null);
    else 
    console.log(undefined);      
}
print('hello');
print(null);
print(undefined);

//optional Chaining
