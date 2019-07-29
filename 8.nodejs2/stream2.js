const fs = require('fs');
const zlib = require("zlib")
let rs = fs.createReadStream('1.txt');
let gz = zlib.createGzip()
let ws = fs.createWriteStream('2.txt.gzip');
rs.pipe(gz).pipe(ws);