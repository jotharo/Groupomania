const Sequelize = require('sequelize');
const config = require('./config.json')

const myEnv = process.env.NODE_ENV
const currentConf = config[myEnv]

module.exports =  new Sequelize(currentConf.database, currentConf.username, currentConf.password, {
  host: currentConf.host,
  dialect: currentConf.dialect,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});