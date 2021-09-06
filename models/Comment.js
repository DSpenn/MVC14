const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'post',
          key: 'id',
        },
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
