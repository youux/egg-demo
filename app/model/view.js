'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ViewSchema = new Schema({
    user: { // 用户
      type: mongoose.ObjectId,
      require: true,
      ref: 'User',
    },
    video: { // 视频
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

  return mongoose.model('View', ViewSchema);
};
