const express = require('express');
const sequelize = require('./src/database');
require('dotenv').config();
const todoRoutes = require('./src/routes/todoRoutes');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

sequelize.sync().then(() => {
  app.use('/api', todoRoutes);
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
