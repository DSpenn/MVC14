const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');


Post.hasMany(Comment, {

});

Post.belongsTo(User, {

});

User.hasMany(Post, {

});

User.hasMany(Comment, {

});

Comment.belongsTo(Post, {

});

Comment.belongsTo(User, {

});

module.exports = { Post, User, Comment };
