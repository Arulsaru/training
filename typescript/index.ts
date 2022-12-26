console.log('hello world');
let age: number = 21;
if (age < 50) {
    age += 10;
}

let user: [number, string] = [1, "Kavi"]
// user.push(1)

// const samll = 1;
// const medium = 2;
// const large = 3;

// const enum Size { small = 0, medium, large };
// let mySize: Size = Size.medium;
// console.log(mySize);

// function calculateTax(income: number, taxYear = 2022): number {
//     if (taxYear < 2022) {
//         return income * 1.2;
//     }
//     return income * 1.3;
// }

// calculateTax(50_000, 2002)


//type alias
type Emloyee = {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void
}

let employee: Emloyee = {
    id: 1001,
    name: 'Kavi',
    retire: (date: Date) => {
        console.log(date);
    }
}

//union types
function kgToLbs(weight: number | string): number {
    if (typeof weight === 'number') {
        return weight * 2.2;
    }
    else
        return parseInt(weight) * 2.2
}
kgToLbs(10);
kgToLbs('10kg');

//intersection type

type Draggable = {
    drag: () => void
};

type Resizeable = {
    resize: () => void
};

type UIWidget = Draggable & Resizeable;

let textBox: UIWidget = {
    drag: () => { },
    resize: () => { }
}

//literal types
type Quantity = 50 | 100;
let quantity: Quantity = 100;

type Metric = 'cm' | 'inch';

//nullable types
function greet(name: string | null | undefined) {
    if (name) {
        console.log(name.toLocaleUpperCase());
    }
    else {
        console.log('Hola!');

    }
}
greet(undefined);

//Optional Chaining

type Customer = {
    birthday: Date
};
function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(1);
// if(customer!==null && customer!==undefined)
//     console.log(customer.birthday);
console.log(customer?.birthday?.getFullYear());
