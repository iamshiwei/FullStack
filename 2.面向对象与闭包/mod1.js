// export let a = 1;

let a = 12;
let b = 122;
let c = "shiwei";
export {a,b,c};

export function sum(n1, n2){
    return n1+n2;
}
export class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    show(){
        alert(this.name);
    }
}
export default 'aaa';