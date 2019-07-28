const http = require('http');
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');

// 1.连接到服务器
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shiwei19910513',
    database: '20190728'
})
// 查询
// db.query('SELECT * FROM user_table', (err, data)=>{
//     if(err){
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data));
//     }
// })

// 插入数据
// let username = 'dage';
// let password = "222222";
// db.query(`INSERT INTO user_table (username, password) VALUES ('${username}', '${password}')`, (err, data)=>{
//     if(err){
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// 2.跟http服务器配合
http.createServer((req, res)=>{
    const {pathname, query} = url.parse(req.url);
    if(pathname == '/reg'){
        // 参数是否正确
        let {username, password} = query;
        if(!username || !password) {
            res.write('用户名或密码不能为空');
            res.end()
        } else if(username.length > 32) {
            res.write("用户名最大32个数字");
            res.end();
        }else if(password.length > 32) {
            res.write("密码最大32个数字");
            res.end();
        } else {
            // 检查用户名是否使用过
            db.query(`SELECT ID FROM user_table WHERE username=${username}`, (err, data)=>{
                if(err){
                    res.write('数据库有错');
                    res.end();
                } else if(data.length > 0){
                    
                }
            });
            // 插入到数据库


        }
    } else if(pathname == '/login') {
        // 检查用户名是否存在
        // 密码是否正确
        // 返回结果
    } else {
        fs.readFile('www' + pathname, (err, buffer)=>{
            if(err){
                res.writeHead(404);
                res.write('not found');
            } else{
                res.write(buffer);
            }
            res.end();
        })
    }
})