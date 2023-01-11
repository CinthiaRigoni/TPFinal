'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RubroGeneral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RubroGeneral.belongsTo(models.BajaLogica, {
        foreignKey: 'bajaLogica_id',
        targetKey: 'id'
      })

      RubroGeneral.hasMany(models.ArticuloManufacturado, {
        foreignKey: 'rubroGeneral_id'
      })
    }
  }
  RubroGeneral.init({
    denominacion: DataTypes.STRING,
    bajaLogica_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RubroGeneral',
  });
  return RubroGeneral;
};