const ejs = require('ejs');
ejs.renderFile('./template/2.ejs', {
    name: "shiwei",
    arr: [12,3,56,6767,5]
},(err, data)=>{
    if(err){
        console.log(err);
    } else {
        console.log(data)
    }
})