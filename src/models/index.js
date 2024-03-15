const dbConfig = require('../db/config');
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    }
  }
);


sequelize.authenticate().then(() => console.log(`Database is connected...`)).catch(() => console.log(`Error in connecting with Database`));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admins = require('./admin/adminModel.js')(sequelize, DataTypes);
db.employees = require('./employee/employeeModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
  .then(() => {
    console.log(`Re-Sync is completed`);
  });


module.exports = db;