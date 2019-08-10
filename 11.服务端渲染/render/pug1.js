const pug = require('pug');
pug.renderFile('./template/1.pug', {
    pretty: true,
    title: 'aasasa',
    users: [
        {name: "zhangsan", pass: "123456"},
        {name: "lisi", pass: "wwwww"},
        {name: "wangwu", pass: "123eeeee456"},
        {name: "zhaoliu", pass: "123rrrr456"},
    ]
}, (err, data)=>{
    if(err){
        console.log('渲染失败')
    } else{
        console.log(data);
    }
})