console.log('Helloc');

const infos: string[] = ['girish', 'ganga', 'yatrik', 'Ganesh', 'Ravi', 'Guna'];
const subInfos: string[] = infos.slice(1, 4);

subInfos.forEach(item => {
    printDatas(item);
});

function printDatas(item: string) {
    console.log(item);
}

subInfos.splice(2, 2);
console.log(subInfos);
const alphabets: readonly [string, boolean, string, number] = ['alpha', true, 'gamma', 5];

enum rectangle {
    length = 2,
    width,
    breadth
}
enum triangle {
    base = 39,
    height
}

const obj: rectangle = rectangle.breadth;
console.log(obj);

const triango: triangle =  triangle.height;
console.log(triango);

const k: number = gst(45, 5);
console.log(k);

function gst(sales: number, goods: number): number {
    return sales * goods;
}

union('hari');
union(100);

function union(randomType: number | string) {

    if( typeof randomType === 'number') {
        console.log('It is a number')
    }
    else{
        console.log('It is a string');
    }
}

type car = {
    readonly model: string,
    name: string,
    year: number,
    milage?: number
}

const sample: car = {
    model: 'Dx40',
    name: 'polo',
    year: 2018,
}

const sample1: car = {
    model: 'DD500',
    name: 'Tiago',
    year: 2019,
    milage: 20
}