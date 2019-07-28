module.exports = {
    username(user) {
        if (!user) {
            return '用户名不能为空'
        } else if (user.length > 32) {
            return '用户名最长32位';
        } else if (!/^\w{4,32}$/.test(user)) {
            return '用户名格式不对';
        } else {
            return null;
        }
    },
    password(pass) {
        if (!pass) {
            return '密码不能为空'
        } else if (pass.length > 32) {
            return '密码最长32位';
        } else {
            return null;
        }
    }
}