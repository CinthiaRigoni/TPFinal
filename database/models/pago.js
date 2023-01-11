'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pago.belongsTo(models.MercadoPagoDatos, {
        foreignKey: 'identificadorPago',
        targetKey: 'id'
      })
    }
  }
  Pago.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    unitPrice: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pago',
  });
  return Pago;
};