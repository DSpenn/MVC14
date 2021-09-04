const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

//use seperate model for replys?
// same model ifcomment field?

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
            
          },
          title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
          },
          body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
