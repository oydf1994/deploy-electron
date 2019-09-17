module.exports = app => {
    const user = app.model.define('user', {
        name: {
            type: app.Sequelize.STRING,
            comment: "用户名"
        },
        pwd: {
            type: app.Sequelize.STRING,
            comment: "用户密码"
        }
    });
    return user;
}