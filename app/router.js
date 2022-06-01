'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  router.prefix('/api/v1'); // 设置基础路径

  router.post('/create-user', controller.user.create);
  router.post('/login', controller.user.login);
  router.get('/user-info', auth, controller.user.userInfo);
  router.post('/user-update', auth, controller.user.userUpdate);
};
