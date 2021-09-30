const { Sequelize } = require('sequelize');
require('dotenv').config()
const database = process.env.DB_NAME,
      login    = process.env.DB_LOGIN,
      password = process.env.DB_PASSWORD,
      port     = process.env.DB_PORT,
      dialect  = process.env.DB_DIALECT,
      host     = process.env.DB_HOST

const sequelize = new Sequelize(
    database,
    login,
    password, 
    {
        host,
        dialect,
        port
    }
)

module.exports = sequelize