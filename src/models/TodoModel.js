const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Todo = sequelize.define('todos', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Todo;
