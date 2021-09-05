const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        autoIncrement: true,
        references: {
          model: 'user',
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
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
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
