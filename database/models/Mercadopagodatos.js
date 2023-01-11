'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MercadoPagoDatos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MercadoPagoDatos.hasMany(models.Pedido, {
        foreignKey: 'mercadoPagoDatos_id'
      })

      MercadoPagoDatos.hasMany(models.Pago, {
        foreignKey: 'identificadorPago'
      })
    }
  }
  MercadoPagoDatos.init({
    identificadorPago: DataTypes.INTEGER,
    fechaCreacion: DataTypes.DATE,
    metodoPago: DataTypes.STRING,
    estado: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MercadoPagoDatos',
  });
  return MercadoPagoDatos;
};