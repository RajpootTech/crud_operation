'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

User.init({
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true, // ✅ Unique constraint
  },
  phone: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'User',
});  return User;
};
