'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // mongoose
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  // 校验规则
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};
