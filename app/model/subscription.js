'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SubscriptionSchema = new Schema({
    user: { // 订阅用户
      type: mongoose.ObjectId,
      require: true,
      ref: 'User',
    },
    channel: { // 订阅视频
      type: mongoose.ObjectId,
      require: true,
      ref: 'User',
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

  return mongoose.model('Subscription', SubscriptionSchema);
};
