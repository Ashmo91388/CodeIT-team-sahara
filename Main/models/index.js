const User = require('./User');
const Post = require('./Post');
const Like = require('./Like')

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Like, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Like.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Like, {
  foreignKey: 'user_id'
});

Like.belongsTo(Post, {
  foreignKey: 'user_id'
});
module.exports = { User, Post, Like};
