'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticuloManufacturado', {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tiempoCocinaEstimado: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      denominacion: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      precioVenta: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      imagen: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      rubroGeneral_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'rubrogeneral',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      bajaLogica_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'bajalogica',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ArticuloManufacturado');
  }
};