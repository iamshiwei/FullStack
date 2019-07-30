const config = require('./config');
const db = require('./libs/database');
(async ()=>{
    let data = await db.query(`SELECT * FROM item_table`);
    console.log(data);
})()