const express = require('express');
require('dotenv').config();
const cors = require('cors');
const todoRoutes = require('./src/routes/todoRoutes');
const sequelize = require('./src/database');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  app.use('/api', todoRoutes);
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
