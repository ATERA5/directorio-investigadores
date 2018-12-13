'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    scholarship: DataTypes.BOOLEAN,
    academic_degree: DataTypes.STRING,
    user_id: {
        type: DataTypes.INTEGER,
        references: 'user',
        referencesKey: 'id'
    },
  }, {
    freezeTableName: true,
  });
  Student.associate = function(models) {
    Student.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
    });
  };
  return Student;
};
