// 引入模块
/*
import * as mod1 from './mod1.js'
console.log(mod1);
alert(mod1.sum(mod1.a,mod1.b));
let p = new mod1.Person("shiwei", 12);
p.show();*/



/*
import {a,b,c} from './mod1';
console.log(a,b,c);*/


import aa from './mod1';
console.log(aa);

// 异步引入mod2
import("./mod2").then(mod2=>{
    console.log(mod2.qq);
}, err=>{
    alert("mod2加载失败")
})