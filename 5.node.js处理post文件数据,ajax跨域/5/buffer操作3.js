let buffer = new Buffer('adadar\r\nddadadadadaad\r\nrwrwrjwrwrow');

function buffersplit(buffer, delimiter) {
    let arr = [];
    let n = 0;
    while (n= buffer.indexOf(delimiter)!=-1){
        arr.push(buffer.slice(0,n));
    }
}