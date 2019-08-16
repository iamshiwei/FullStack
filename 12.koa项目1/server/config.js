const path = require('path');
module.exports = {
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASS: 'shiwei19910513',
    DB_NAME: 'cpts',

    PORT: 8080,
    HTTP_ROOT: 'http://localhost:8080',
    UPLOAD_DIR: path.resolve(__dirname, './static/upload')
}