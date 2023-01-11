'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Domicilio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Domicilio.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        targetKey: 'id'
      })

      Domicilio.hasMany(models.Pedido, {
        foreignKey: 'domicilio_id'
      })
    }
  }
  Domicilio.init({
    usuario_id: DataTypes.INTEGER,
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    localidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Domicilio',
  });
  return Domicilio;
};