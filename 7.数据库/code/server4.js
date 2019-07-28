const http = require('http');
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');
const co = require('co-mysql');
const validator = require('./lib/validator')

// 1.连接到服务器
let conn = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'shiwei19910513',
    database: '20190728'
})
let db = co(conn);
// 2.跟http服务器配合
http.createServer(async (req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname == '/reg') {
        let { username, password } = query;
        // 参数是否正确
        let err = validator.username(query.username);
        if (err) {
            res.write(err);
        } else {
            let err = validator.password(query.password);
            if (err) {
                res.write(err);
            } else {
                try {
                    // 检查用户名是否使用过
                    let data = await db.query(`SELECT ID FROM user_table WHERE username='${username}'`);
                    if (data.length > 0) {
                        res.write('此用户名已被占用');
                    } else {
                        await db.query(`INSERT INTO user_table (username, password) VALUES ('${username}', '${password}')`)
                        res.write('成功');
                    }
                } catch (err) {
                    res.write('服务器出错');
                }
            }
            res.end();
        }
    } else if (pathname == '/login') {
        // 检查用户名、密码格式
        // 检查用户名是否存在
        // 密码是否正确
        // 返回结果
        let { username, password } = query;
        let err = validator.username(username);
        if (err) {
            res.write(err);
        } else {
            try {
                let err = validator.password(password);
                if (err) {
                    res.write(err);
                } else {
                    let data = await db.query(`SELECT ID, password FROM user_table WHERE username='${username}'`);
                    if (data.length == 0) {
                        res.write('用户名不存在');
                    } else if (data[0].password != password) {
                        res.write('密码不正确');
                    } else {
                        res.write('成功');
                    }
                }
            } catch (e) {
                console.log(e)
            }

        }
        res.end();
    } else {
        fs.readFile('www' + pathname, (err, buffer) => {
            if (err) {
                res.writeHead(404);
                res.write('not found');
            } else {
                res.write(buffer);
            }
            res.end();
        })
    }
}).listen(8888);