const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        'index': path.resolve(__dirname, './src/js/1'),
        'admin': path.resolve(__dirname, './src/js/2')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].min.js'
    }
}