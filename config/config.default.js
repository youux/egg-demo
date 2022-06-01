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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1654016812768_7363';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 链接数据库
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/caicai',
      options: {
        useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };

  // 关闭 csrf 防范
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: 'e59ffb15-21b1-4357-b922-c68a6590b81c',
    expiresIn: '1d',
  };

  return {
    ...config,
    ...userConfig,
  };
};
