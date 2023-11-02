const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'todos',
  'postgres',
  'dheeraj@700',
  {
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
