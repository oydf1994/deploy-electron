/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.validate = {
    // convert: false,
    // validateRoot: false,
  };
  config.cluster = {
    listen: {
      port: 7003,
    }
};
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564990462541_2285';
  config.jwtKey = 'east'
  // add your middleware config here
  config.middleware = ['cors', 'notfoundHandler', 'log', 'compress'];
  config.compress = {
    threshold: 2048,
  }
  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host: '116.62.150.59', // 连接的数据库主机地址
    port: 3306, // mysql服务端口
    database: 'develop', // 数据库名
    username: 'develop', // 数据库用户名
    password: 'develop', // 数据库密码
    define: { // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: false, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false // 防止驼峰式字段被默认转为下划线
    },
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};