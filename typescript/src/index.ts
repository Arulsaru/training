enum variables { a = 1, b, c, d};
let x: variables = variables.c;
console.log(x);


const user: [number, string, boolean] = [1, 'hai', true];
user.push('hello')
console.log(user);


function calcValue(var1: number, var2: number = 20): number {
    if(var1 <= 10 && var2 <= 10) 
        return var1 + var2;
    return var1 - var2;
}

console.log(calcValue(30));


type Employee = {
    readonly name: string,
    emp_id: number,
    email: string 
}   

let employee1: Employee = {
    name: 'hari',
    emp_id: 11,
    email: 'hari@gmail.com'
} 

const employee2: Employee = {
    name: 'Arul',
    emp_id: 21,
    email: 'arul@gmail.com'
}

function calckg(weight: number | string): number {
    if(typeof weight === 'number') 
        return weight * 2;
    else
        return parseInt(weight) * 3;
}

type sum = {
    sum1: () => void
}

type sub = {
    sub1: () => void
}

type math = sum & sub;

const calc: math = {
    sum1: () => {},
    sub1: () => {}
}