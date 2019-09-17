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
    config.logger = {
        dir: '/www/wwwroot/project/egg/logs/prod',
    }
    const userConfig = {
        myAppName: 'prod',
    };

    return {
        ...config,
        ...userConfig,
    };
};