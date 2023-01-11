'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.EstadoPedido, {
        foreignKey: 'estadoPedido_id',
        targetKey: 'id'
      })

      Pedido.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        targetKey: 'id'
      })

      Pedido.belongsTo(models.Domicilio, {
        foreignKey: 'domicilio_id',
        targetKey: 'id'
      })

      Pedido.belongsTo(models.MercadoPagoDatos, {
        foreignKey: 'mercadoPagoDatos_id',
        targetKey: 'id'
      })

      Pedido.hasOne(models.Factura, {
        foreignKey: 'pedido_id'
      })

      Pedido.hasMany(models.DetallePedido, {
        foreignKey: 'pedido_id'
      })
    }
  }
  Pedido.init({
    fecha: DataTypes.DATE,
    numero: DataTypes.INTEGER,
    estadoPedido_id: DataTypes.INTEGER,
    horaEstimadaFin: DataTypes.TIME,
    tipoEnvio: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    usuario_id: DataTypes.INTEGER,
    domicilio_id: DataTypes.INTEGER,
    mercadoPagoDatos_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};