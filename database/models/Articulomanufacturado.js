'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticuloManufacturado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticuloManufacturado.belongsTo(models.BajaLogica, {
        foreignKey: 'bajaLogica_id',
        targetKey: 'id'
      })

      ArticuloManufacturado.belongsTo(models.RubroGeneral, {
        foreignKey: 'rubroGeneral_id',
        targetKey: 'id'
      })

      ArticuloManufacturado.hasMany(models.ArticuloManufacturadoDetalle, {
        foreignKey: 'articuloManufacturado_id'
      })

      ArticuloManufacturado.hasMany(models.DetallePedido, {
        foreignKey: 'articuloManufacturado_id'
      })
    }
  }
  ArticuloManufacturado.init({
    tiempoCocinaEstimado: DataTypes.INTEGER,
    denominacion: DataTypes.STRING,
    precioVenta: DataTypes.DECIMAL,
    imagen: DataTypes.STRING,
    rubroGeneral_id: DataTypes.INTEGER,
    bajaLogica_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticuloManufacturado',
  });
  return ArticuloManufacturado;
};