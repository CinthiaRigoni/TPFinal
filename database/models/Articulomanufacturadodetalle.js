'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticuloManufacturadoDetalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticuloManufacturadoDetalle.belongsTo(models.BajaLogica, {
        foreignKey: 'bajaLogica_id',
        targetKey: 'id'
      })

      ArticuloManufacturadoDetalle.belongsTo(models.ArticuloInsumo, {
        foreignKey: 'articuloInsumo_id',
        targetKey: 'id'
      })

      ArticuloManufacturadoDetalle.belongsTo(models.ArticuloManufacturado, {
        foreignKey: 'articuloManufacturado_id',
        targetKey: 'id'
      })
    }
  }
  ArticuloManufacturadoDetalle.init({
    cantidad: DataTypes.INTEGER,
    unidadMedida: DataTypes.STRING,
    articuloInsumo_id: DataTypes.INTEGER,
    articuloManufacturado_id: DataTypes.INTEGER,
    bajaLogica_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticuloManufacturadoDetalle',
  });
  return ArticuloManufacturadoDetalle;
};