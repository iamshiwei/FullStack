const config = require('./config');
const db = require('./libs/database');
const http = require('./libs/http');
const { addRouter } = require('./libs/router');

addRouter('get', '/list', async (res, get, post, files) => {
    try {
        let data = await db.query(`SELECT * FROM item_table`);
        res.writeJson({
            err: 0,
            data
        })
    } catch (err) {
        res.writeJson({err: 1, msg: 'database error'})
    }

    res.end();
})
addRouter('post', '/add', async (res, get, post, files) => {
    let {title, price, count} = post;
    if(!title || !price || !count) {
        res.writeJson({err: 1,msg: "params invalid"});
        res.end();
    } else {
        price = Number(price);
        count = Number(count);
        if(isNaN(price) || isNaN(count)){
            res.writeJson({err: 1,msg: "params invalid"});
            res.end();
        } else {
            try{
                // 下面的代码可能会带来安全隐患
                // db.query(`INSERT INTO item_table (title, price, count)  VALUES ('${title}', '${price}', '${count}')`)
                await db.query(`INSERT INTO item_table (title, price, count) VALUES(?,?,?)`, [title, price, count]);
                res.writeJson({err:0, msg: 'success'})
            } catch(err){
                res.writeJson({err: 1, msg: 'database error'});
            }
            res.end();
        }
    }
})
addRouter('get', '/del', async (res, get, post, files) => {

})
