module.exports = async(res, get, post, files) => {
    let { title, price, count } = post;
    if (!title || !price || !count) {
        res.writeJson({ err: 1, msg: "params invalid" });
        res.end();
    } else {
        price = Number(price);
        count = Number(count);
        if (isNaN(price) || isNaN(count)) {
            res.writeJson({ err: 1, msg: "params invalid" });
            res.end();
        } else {
            try {
                // 下面的代码可能会带来安全隐患
                // db.query(`INSERT INTO item_table (title, price, count)  VALUES ('${title}', '${price}', '${count}')`)
                await db.query(`INSERT INTO item_table (title, price, count) VALUES(?,?,?)`, [title, price, count]);
                res.writeJson({ err: 0, msg: 'success' })
            } catch (err) {
                res.writeJson({ err: 1, msg: 'database error' });
            }
            res.end();
        }
    }
}