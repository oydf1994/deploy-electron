module.exports = app => {
    const item = app.model.define('item', {
        name: {
            type: app.Sequelize.STRING,
            comment: "项目名称"
        },
        location: {
            type: app.Sequelize.STRING,
            comment: "服务器地址"
        },
        ssh: {
            type: app.Sequelize.STRING,
            comment: "服务器账号"
        },
        password: {
            type: app.Sequelize.STRING,
            comment: "服务器密码"
        },
        addressServer: {
            type: app.Sequelize.STRING,
            comment: "服务器部署地址"
        },
        addressLocal: {
            type: app.Sequelize.STRING,
            comment: "本地项目地址"
        },
        user: {
            type: app.Sequelize.STRING,
            comment: "本地项目地址"
        }
    });
    return item;
}