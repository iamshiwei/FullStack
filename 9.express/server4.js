const express = require('express');
const multer = require('multer');
const app = express();
app.listen(8888);

let obj = multer({
    dest: './static/upload'
})
app.use(obj.any());
app.post('/reg', (req, res)=>{
    console.log(req.files);
})