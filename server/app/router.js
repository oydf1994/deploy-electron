'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const verify = app.middleware.verify;
  router.all('/', controller.user.index);
  router.post('/user/login', controller.user.login);
  router.post('/item/add', verify, controller.item.add);
  router.get('/item/del', verify, controller.item.del);
  router.get('/item/list', verify, controller.item.list);
};
