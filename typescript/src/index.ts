// let message = 'Arulmozhi Karunagaran';
// message = 10;

// let message: string = 'Arulmozhi';
// message = 10;
// console.log(message);

// let value: number = 100;
// console.log(value);

// let booleanValue: boolean = true;
// console.log(booleanValue);

// const numbers: number[] = [1, 2, 3, 4];
// console.log(numbers);
// numbers.push(5);
// console.log(numbers);

// const strings: string[] = [];
// strings[0] = 'Arul';
// strings[1] = 'Sarumathi'

// strings.forEach(str => console.log(str.length));

// const myTuple: [number, number, boolean];
// myTuple = [5, 5, true];
// console.log(myTuple);

// const persons = {
//     name: 'Arulmozhi',
//     gender: 'male'
// }
// console.log(persons.name);

// enum Value { one = 1, two, three, four, five, six, zero = 0, tempOne, tempTwo, tempThree };
// const enum Value { one = 1, two, three, four, five, six, zero = 0, tempOne, tempTwo, tempThree };
// console.log(Value.six, Value.zero, Value.tempOne, Value.tempTwo);

// function display(): void {
//     console.log('Display function without return type called');
// }
// display();

// function display( value = 'afs' ): number { // value oda type idha vechi eduthukum 
//     console.log('Display function with return type called - ', value);
//     return 100;
// }

// const returnValue = display('afs');
// console.log(returnValue);

// const user: {
//     readonly id: number,
//     namee: string
// } = {
//     id: 101, 
//     namee: 'Arulmozhi Karunagaran'  // default values
// }
// // user.id = 100;
// user.namee = 'Dhivya'
// console.log(user);

// const names: { [index: string]: number } = {};
// names.mobile = 1234567890;
// names.landline = 0987654321;
// names.other = 'Arulmozhi';  // Error
// console.log(names);



// interface Name {
//     firstName: string,
//     lastName: string
// }

// interface phoneNumber extends Name {
//     phone: number
// }

// const details: phoneNumber = {
//     firstName: 'Arulmozhi',
//     lastName: 'Karunagaran',
//     phone: 1234567890,
// };

// console.log(details);

// function display( input: string | number ) {
//     console.log(`The type of input is ${typeof input}`);
// }
// display('Arulmozhi');
// display(143);


// let value :  unknown = 'Arulmozhi';
// console.log( typeof (value as string) );
// console.log( (value as string).length );
// value = 10;
// console.log( (value as string).length );  //undefined
// console.log( typeof (<number> value) );

