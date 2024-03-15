
module.exports = (sequelize, DataTypes) => {

  const Employee = sequelize.define('employee', {

    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      trim: true
    },
    company_name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      trim: true
    },
    designation: {
      type: DataTypes.STRING(256),
      allowNull: false,
      trim: true
    },
    email_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      trim: true
    }
  });

  return Employee;
};