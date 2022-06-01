'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { // 用户名
      type: String,
      require: true,
    },
    email: {// 邮箱
      type: String,
      require: true,
    },
    password: {// 密码
      type: String,
      select: false, // 查询中不包含该字段
      require: true,
    },
    avatar: {// 头像
      type: String,
      default: null,
    },
    channelDescription: {// 频道介绍
      type: String,
      default: null,
    },
    createdAt: {// 创建时间
      type: Date,
      default: Date.now,
    },
    updatedAt: {// 更新时间
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('User', UserSchema);
};
