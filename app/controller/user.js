'use strict';


const Controller = require('egg').Controller;

class UserController extends Controller {
  // 创建账户
  async create() {
    const { ctx } = this;
    const body = this.ctx.request.body;

    // 1. 数据校验
    ctx.validate({
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'email' },
    });

    const UserSerice = this.service.user;
    if (await UserSerice.findByUsername(body.username)) {
      ctx.throw(422, '用户已存在');
    }
    if (await UserSerice.findByEmail(body.email)) {
      ctx.throw(422, '邮箱已存在');
    }

    // 2. 保存用户
    const user = await UserSerice.createUser(body);

    // 3. 生成token
    const token = UserSerice.createToken({
      userId: user._id,
    });

    // 4. 发送响应
    ctx.body = {
      code: 200,
      msg: '创建成功',
      data: {
        email: user.email,
        token,
        username: user.username,
        avatar: user.avatar,
        channelDescription: user.channelDescription,
      },
    };
  }
  // 登录
  async login() {
    // 1．基本数据验证
    const { ctx } = this;
    const body = this.ctx.request.body;
    ctx.validate({
      email: { type: 'email' },
      password: { type: 'string' },
    }, body);

    const UserSerice = this.service.user;
    // 2．校验邮箱是否存在
    const user = await UserSerice.findByEmail(body.email);
    if (!user) {
      ctx.throw(422, '用户不存在');
    }

    // 3．校验密码是否正确
    if (ctx.helper.md5(body.password) !== user.password) {
      ctx.throw(422, '密码不正确');
    }

    // 4．生成 Token
    const token = UserSerice.createToken({
      userId: user._id,
    });

    // 5．发送响应数据
    ctx.body = {
      code: 200,
      data: {
        email: user.email,
        token,
        username: user.username,
        avatar: user.avatar,
        channelDescription: user.channelDescription,
      },
    };
  }
  // 获取用户数据
  async userInfo() {
    const { ctx } = this;
    // 1.验证token
    // 2. 获取用户
    // 3.发送响应
    const user = ctx.user;
    ctx.body = {
      code: 200,
      data: {
        email: user.email,
        // eslint-disable-next-line dot-notation
        token: ctx.header['authorization'],
        username: user.username,
        avatar: user.avatar,
        channelDescription: user.channelDescription,
      },
    };
  }
  // 更新用户数据
  async userUpdate() {
    const { ctx } = this;
    const body = this.ctx.request.body;
    // 1.基本数据验证
    ctx.validate({
      username: { type: 'string', required: false },
      avatar: { type: 'string', required: false },
      channelDescription: { type: 'string', required: false },
      email: { type: 'email', required: false },
    }, body);

    const UserSerice = this.service.user;
    // 2. 校验用户是否存在
    if (body.username) {
      if (body.username !== ctx.user.username && await UserSerice.findByUsername(body.email)) {
        ctx.throw(422, '用户名已存在');
      }
    }
    // 3.校验邮箱是否存在
    if (body.email) {
      if (body.emaill !== ctx.user.email && await UserSerice.findByEmail(body.email)) {
        ctx.throw(422, '邮箱已存在');
      }
    }
    // 4.更新用户信息
    const user = await UserSerice.updateUser(body);

    // 5.返回更新之后的用户信息
    ctx.body = {
      code: 200,
      msg: '更新成功',
      data: {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        channelDescription: user.channelDescription,
      },
    };
  }
}

module.exports = UserController;
