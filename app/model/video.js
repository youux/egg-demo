'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const VideoSchema = new Schema({
    title: { // 视频标题
      type: String,
      require: true,
    },
    description: { // 视频介绍
      type: String,
      require: true,
    },
    playUrl: { // 视频播放地址
      type: String,
      require: true,
    },
    cover: { // 视频封面
      type: String,
      require: true,
    },
    user: { // 视频作者
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

  return mongoose.model('Video', VideoSchema);
};
