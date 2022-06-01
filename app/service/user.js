'use strict';
const Serive = require('egg').Service;
const jwt = require('jsonwebtoken');

class UserSerice extends Serive {
  get User() {
    return this.app.model.User;
  }
  findByUsername(username) {
    return this.User.findOne({ username });
  }

  findByEmail(email) {
    return this.User.findOne({ email }).select('+password');
  }

  findByUser(user) {
    return this.User.findOne({ user });
  }

  async createUser(data) {
    data.password = this.ctx.helper.md5(data.password);
    const user = new this.User(data);
    await user.save(); // 保存到数据库中
    return user;
  }
  createToken(data) {
    return jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
  }

  cerifyToken(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }

  updateUser(data) {
    return this.User.findByIdAndUpdate(this.ctx.user._id, data, {
      new: true, // 返回更新之后的数据
    });
  }
}

module.exports = UserSerice;
