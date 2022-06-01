'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const LikeSchema = new Schema({
    like: { // 点赞状态
      type: Number,
      enum: [ 1, -1 ], // 喜欢1，不喜欢-1
      require: true,
    },
    user: { // 点赞用户
      type: mongoose.ObjectId,
      require: true,
      ref: 'User',
    },
    video: { // 点赞视频
      type: mongoose.ObjectId,
      require: true,
      ref: 'Video',
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

  return mongoose.model('Like', LikeSchema);
};
