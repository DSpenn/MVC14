const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
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
    created_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      unique: false,
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
