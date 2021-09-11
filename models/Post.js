const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
class Post extends Model {}

Post.init({
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'user',
			key: 'id'
		}
	},
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	created_date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	title: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	body: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'post'
});

module.exports = Post;
