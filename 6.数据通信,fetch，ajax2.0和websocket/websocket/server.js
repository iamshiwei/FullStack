const http = require('http');
const io = require("socket.io");
// 1.建立普通的http
let server = http.createServer((req, res) => {
});
server.listen(8888);
// 2.建立ws服务
let wsServer = io.listen(server);
wsServer.on('connection', sock => {
    // sock.emmit(name, 数据)   给客户端发宋数据
    // sock.on('name', function(数据){})
    /*sock.on('aaa', function (a, b) {
        console.log(a, b, a + b);
    })*/
    setInterval(function () {
        sock.emit('timer', new Date().getTime())
    }, 1000)
})
