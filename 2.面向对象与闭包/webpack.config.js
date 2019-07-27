const path = require('path');
module.exports = {
    mode: "none",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
}