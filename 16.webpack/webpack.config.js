const path = require('path');
const autoprefixer = require('autoprefixer');
module.exports = {
    mode: 'development',
    entry: './src/js/1.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader', 'postcss-loader']
            }
        ]
    }
}