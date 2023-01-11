'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RubroInsumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RubroInsumo.belongsTo(models.BajaLogica, {
        foreignKey: 'bajaLogica_id',
        targetKey: 'id'
      })

      RubroInsumo.hasMany(models.ArticuloInsumo, {
        foreignKey: 'rubroInsumo_id'
      })
    }
  }
  RubroInsumo.init({
    denominacion: DataTypes.STRING,
    bajaLogica_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RubroInsumo',
  });
  return RubroInsumo;
};