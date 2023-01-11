'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticuloInsumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticuloInsumo.belongsTo(models.BajaLogica, {
        foreignKey: 'bajaLogica_id',
        targetKey: 'id'
      })

      ArticuloInsumo.belongsTo(models.RubroInsumo, {
        foreignKey: 'rubroInsumo_id',
        targetKey: 'id'
      })

      ArticuloInsumo.hasMany(models.ArticuloManufacturadoDetalle, {
        foreignKey: 'articuloInsumo_id'
      })
    }
  }
  ArticuloInsumo.init({
    denominacion: DataTypes.STRING,
    precioCompra: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL,
    stockActual: DataTypes.INTEGER,
    stockMinimo: DataTypes.INTEGER,
    unidadMedida: DataTypes.STRING,
    esInsumo: DataTypes.BOOLEAN,
    rubroInsumo_id: DataTypes.INTEGER,
    bajaLogica_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticuloInsumo',
  });
  return ArticuloInsumo;
};