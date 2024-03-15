
module.exports = (sequelize, DataTypes) => {

  const Admin = sequelize.define('admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      trim: true
    },
    email_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      trim: true
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      trim: true
    }
  });

  return Admin;
};