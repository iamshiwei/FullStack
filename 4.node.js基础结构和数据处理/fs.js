const fs = require('fs');
fs.writeFile('./a.txt', 'dsfsfsfsfsfs',(err)=>{
    if(err){
        console.log(err)
    } else {
        console.log('成功');
        
    }
})
fs.readFile('./a.txt',(err, data)=>{
    if(err){
        console.log(err)
    } else {
        console.log(data.toString());
    }
})