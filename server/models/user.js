'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    names: DataTypes.STRING,
    last_names: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
  }, {
    freezeTableName: true,
  });
  User.associate = function(models) {
      User.hasMany(models.PhoneUser, {
         as: 'phones',
         onDelete: 'CASCADE',
      });
  };
  return User;
};
