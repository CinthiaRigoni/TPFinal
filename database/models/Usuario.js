'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.BajaLogica, {
        foreignKey: 'bajaLogica_id',
        targetKey: 'id'
      })

      Usuario.belongsTo(models.Rol, {
        foreignKey: 'rol_id',
        targetKey: 'id'
      })

      Usuario.hasMany(models.Domicilio, {
        foreignKey: 'usuario_id'
      })

      Usuario.hasMany(models.Pedido, {
        foreignKey: 'usuario_id'
      })
    }
  }
  Usuario.init({
    usuario: DataTypes.STRING,
    clave: DataTypes.STRING,
    rol_id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    email: DataTypes.STRING,
    bajaLogica_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};