let a = '10';
let b = '5';

//a = parseInt(a, 10);
//b = parseInt(b, 10);

a = Number(a);
b = Number(b);

function getCalc(a, b) {
    const multiplie = a * b;
    const divide = a / b;
    const subtract = a - b;
    const add = a + b;

    return `${multiplie}, ${divide}, ${subtract}, ${add}`;
}

console.warn(getCalc(a, b));
