'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    content: { // 评论内容
      type: String,
      require: true,
    },
    user: { // 评论用户
      type: mongoose.ObjectId,
      require: true,
      ref: 'User',
    },
    video: { // 评论视频
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

  return mongoose.model('Comment', CommentSchema);
};
