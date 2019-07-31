const path = require('path');
module.exports = {
    // database
    DB_HOST: 'localhost',
    DB_PORT: 3306,
    DB_USER: 'root',
    DB_PASSWORD: 'shiwei19910513',
    DB_NAME: '20190728',

    // http
    HTTP_PORT: 8888,
    HTTP_ROOT: path.resolve(__dirname, '../static/'),
    HTTP_UPLOAD: path.resolve(__dirname, '../static/upload')
}