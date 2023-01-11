'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Factura.belongsTo(models.Pedido, {
        foreignKey: 'pedido_id',
        targetKey: 'id'
      })
    }
  }
  Factura.init({
    fecha: DataTypes.DATE,
    numero: DataTypes.INTEGER,
    montoDescuento: DataTypes.DECIMAL,
    formaPago: DataTypes.STRING,
    nroTarjeta: DataTypes.STRING,
    totalVenta: DataTypes.DECIMAL,
    totalCosto: DataTypes.DECIMAL,
    pedido_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};