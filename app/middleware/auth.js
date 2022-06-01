'use strict';
module.exports = () => {
  return async (ctx, next) => {
    // 1. 获取请求头中的 token 数据
    // eslint-disable-next-line dot-notation
    let token = ctx.headers['authorization'];
    token = token ? token.split('Bearer ')[1] : null; // Bearer空格token数据

    // 2. 验证 token ,无效401
    if (!token) {
      ctx.throw(401);
    }

    try {
      // 3. token有效，根据userId获取用户数据挂载到ctx对象中给后续中间件使用
      const data = ctx.service.user.cerifyToken(token);
      ctx.user = await ctx.model.User.findById(data.userId);
    } catch (error) {
      ctx.throw(401);
    }
    // 4. next执行后续中间件
    await next();
  };
};
