// 路由表
let router = {};
function addRouter(method, url, fn) {
    method = method.toLowerCase();
    url = url.toLowerCase();
    router[method] = router.method || {};
    router[method][url] = fn;
}
function findRouter(method, url){
    method = method.toLowerCase();
    url = url.toLowerCase();
    if(!method[method] || !method[method][url]){
        return null;
    } else {
        return method[method][url];
    }
}
module.exports = {
    addRouter, findRouter
}