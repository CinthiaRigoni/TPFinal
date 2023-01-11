const { Sequelize } = require('sequelize');

const config = require('./config');

const sequelize = new Sequelize(config.production)

let conexion = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexion establecida con la Base de Datos');
  } catch (error) {
    console.error('Error al conectar a la Base de Datos:', error);
  }
};

module.exports = { conexion, sequelize };