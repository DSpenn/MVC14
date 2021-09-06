const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {  
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
//use seperate model for replys?
// same model ifcomment field?

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true, // needed?
      autoIncrement: true          
    },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        }
    },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        len: [8],
          },
      },
    },
    {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
        },
      },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);
      
module.exports = User;
      