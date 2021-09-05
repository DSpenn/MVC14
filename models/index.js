const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

//Users Hasmany post;
//user haasmany commemtl;
//post belongsto user;
//commnet belongsto post
//post hasone user?



module.exports = { Post, User, Comment };